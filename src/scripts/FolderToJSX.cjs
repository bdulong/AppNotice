require('dotenv').config();
const fs = require("fs");
const path = require("path");
const axios = require("axios");

// URL de l'API pour récupérer les notices
const apiNotice = process.env.API_NOTICE;

// Chemin vers le serveur réseau
const serverPath = "\\\\srvep-info\\dossiers\\";

// Chemin pour ranger les fichiers JSX générés
const dossiersjsxPath = process.env.DOSSIERS_PATH_JSX;

// Chemin pour ranger les fichiers téléchargés
const publicDossiersPath = process.env.DOSSIERS_PATH;

// Fonction pour trouver le dossier correspondant
const findMatchingFolder = (basePath, folderPrefix) => {
    const folders = fs.readdirSync(basePath);
    return folders.find(folder => folder.startsWith(folderPrefix));
};

// Fonction pour télécharger et copier les fichiers
const downloadAndCopyFiles = async (dossier, notices) => {
    const dossierPrefix = dossier.substring(0, 8);
    const fullDossierName = findMatchingFolder(serverPath, dossierPrefix);
    
    if (!fullDossierName) {
        console.error(`Dossier non trouvé pour le préfixe: ${dossierPrefix}`);
        return;
    }

    const sourcePath = path.join(serverPath, fullDossierName, "16 - Notice");
    const destinationPath = path.join(publicDossiersPath, dossier);

    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
    }

    for (const notice of notices) {
        const sourceFile = path.join(sourcePath, notice);
        const destinationFile = path.join(destinationPath, notice);

        try {
            if (fs.existsSync(sourceFile)) {
                fs.copyFileSync(sourceFile, destinationFile);
                console.log(`Fichier copié: ${notice}`);
            } else {
                console.error(`Fichier source non trouvé: ${sourceFile}`);
            }
        } catch (error) {
            console.error(`Erreur lors de la copie du fichier ${notice}:`, error);
        }
    }
};

// Fonction pour formatter le nom du dossier
const formatterNomDossier = (nomDossier) => {
    return nomDossier.replace(/\d+/g, "").replace(/-/g, "").replace(/_/g, " ").trim();
};

// Fonction pour obtenir le type de notice
const getNoticeType = (fileName) => {
    if (fileName.includes('TPT')) return 'TPT';
    if (fileName.includes('EMB')) return 'EMB';
    if (fileName.includes('ELC')) return 'ELC';
    if (fileName.includes('INS')) return 'INS';
    if (fileName.includes('DMT')) return 'DMT';
    return 'AUTRE';
};

const extraireLiensExistants = (cheminFichierJSX) => {
    if (!fs.existsSync(cheminFichierJSX)) {
        return [];
    }
    const contenu = fs.readFileSync(cheminFichierJSX, 'utf8');
    const regex = /window\.openPDF\('([^']+)'\)/g;
    const liens = [];
    let match;
    while ((match = regex.exec(contenu)) !== null) {
        liens.push(match[1]);
    }
    return liens;
};

// Fonction pour générer le contenu JSX
const genererContenu = (dossierInfo, dossierName, liensExistants, noticesToDelete) => {
    const { dossier, marque, libelle, notices } = dossierInfo;
    const nomDossierFormate = formatterNomDossier(dossier);

    const tousLesLiens = [...new Set([...liensExistants, ...notices.map(notice => `/dossiers/${dossier}/${notice}`)])];

    const noticesHTML = tousLesLiens
        .filter(lien => !noticesToDelete.includes(path.basename(lien)))
        .map(lien => {
            const notice = path.basename(lien);
            const type = getNoticeType(notice);
            return `
        <div className='CTA-notice'>
            <button 
                onClick={() => window.openPDF('${lien}')}
                className='PDF-link'
            >
                <img src={'/icons/${type}.svg'} alt={'${type} icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
                <h2>{t('sousDossiers.${type}')}</h2>
            </button>
        </div>`;
        }).join("\n");

    return `import React from 'react'
import { useTranslation } from 'react-i18next';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';
import CTALanguage from '../CTALanguage/CTALanguage.jsx';

const Page = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
      window.openPDF = (filePath) => {
          window.open(filePath, '_blank');
      };
  }, []);

  return (
      <main>
          <Header />
          <div className='content'>
              <h1>${marque}</h1>
              <div className='CTA-container'>
                  ${noticesHTML}
              </div>
              <CTALanguage />
          </div>
      </main>
  );
};

export default Page;
`;
};

// Fonction pour mettre à jour le contenu JSX existant
const mettreAJourContenuJSX = (contenu, noticesToDelete) => {
    const lignes = contenu.split('\n');
    let resultat = [];
    let dansDiv = false;
    let divActuel = [];

    for (const ligne of lignes) {
        if (ligne.includes("<div className='CTA-notice'>")) {
            dansDiv = true;
            divActuel = [ligne];
        } else if (dansDiv) {
            divActuel.push(ligne);
            if (ligne.includes("</div>")) {
                dansDiv = false;
                const divComplet = divActuel.join('\n');
                if (!noticesToDelete.some(notice => divComplet.includes(notice))) {
                    resultat.push(divComplet);
                }
                divActuel = [];
            }
        } else {
            resultat.push(ligne);
        }
    }

    return resultat.join('\n');
};

// Fonction principale
const main = async () => {
    console.log("Début du traitement...");

    try {
        // Appel à l'API
        const response = await axios.get(apiNotice);
        const jsonData = response.data;

        // Traiter les notices à supprimer
        const noticesToDeleteByDossier = {};
        if (jsonData.delete) {
            jsonData.delete.forEach(item => {
                noticesToDeleteByDossier[item.dossier] = item.notices;
            });
        }

        // Traiter les notices à créer ou mettre à jour
        if (jsonData.create) {
            for (const dossierInfo of jsonData.create) {
                const { dossier, notices } = dossierInfo;
                console.log(`Traitement du dossier: ${dossier}`);

                // Télécharger et copier les fichiers
                await downloadAndCopyFiles(dossier, notices);

                // Vérifier si le fichier JSX existe déjà et extraire les liens existants
                const cheminFichierJSX = path.join(dossiersjsxPath, `${dossier}.jsx`);
                const liensExistants = extraireLiensExistants(cheminFichierJSX);

                // Obtenir les notices à supprimer pour ce dossier
                const noticesToDelete = noticesToDeleteByDossier[dossier] || [];

                // Générer le contenu JSX avec les liens existants, les nouveaux, et en excluant les notices à supprimer
                const contenuJSX = genererContenu(dossierInfo, dossier, liensExistants, noticesToDelete);
                fs.writeFileSync(cheminFichierJSX, contenuJSX);
                console.log(`Fichier JSX mis à jour: ${dossier}.jsx`);
            }
        }

        // Traiter les suppressions pour les dossiers non présents dans la section "create"
        if (jsonData.delete) {
            for (const item of jsonData.delete) {
                const { dossier, notices } = item;
                if (!jsonData.create || !jsonData.create.some(createItem => createItem.dossier === dossier)) {
                    const cheminFichierJSX = path.join(dossiersjsxPath, `${dossier}.jsx`);
                    if (fs.existsSync(cheminFichierJSX)) {
                        let contenuJSX = fs.readFileSync(cheminFichierJSX, 'utf8');
                        contenuJSX = mettreAJourContenuJSX(contenuJSX, notices);
                        fs.writeFileSync(cheminFichierJSX, contenuJSX);
                        console.log(`Fichier JSX mis à jour (suppressions uniquement): ${dossier}.jsx`);
                    }
                }
            }
        }

        console.log("Traitement terminé.");
    } catch (error) {
        console.error("Erreur lors du traitement:", error);
    }
};

// Exécuter le script
main();