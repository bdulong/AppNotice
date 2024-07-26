require('dotenv').config();
const fs = require("fs");
const path = require("path");

// Chemins définis dans le fichier .env
const jsonFilePath = process.env.JSON_FILE_PATH;

// Chemin vers "dossiers" (contient les fichiers et l'arborescence 
// de l'application c'est le dossier vers lequel on IMPORTE via l'interface
// les fichiers et dossier d'Esperanto)
const dossiersPath = process.env.DOSSIERS_PATH;

// Chemin pour ranger les fichiers JSX (page numéro de dossier) 
// généré par FolderTOJSX.cjs
const dossiersjsxPath = process.env.DOSSIERS_PATH_JSX;

// Lire le fichier JSON
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Fonction pour trouver le dossier correspondant
const findMatchingFolder = (basePath, folderPrefix) => {
    const folders = fs.readdirSync(basePath);
    return folders.find(folder => folder.startsWith(folderPrefix));
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
const genererContenu = (dossierInfo, fullDossierName, liensExistants, noticesToDelete) => {
    const { dossier, marque, libelle, notices } = dossierInfo;
    const nomDossierFormate = formatterNomDossier(dossier);

    const tousLesLiens = [...new Set([...liensExistants, ...notices.map(notice => `/dossiers/${fullDossierName}/16 - Notice ${dossier.substring(0, 8)}/${notice}`)])];

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

// const copyDirectory = (source, destination) => {
//     if (!fs.existsSync(destination)) {
//         fs.mkdirSync(destination, { recursive: true });
//     }

//     const files = fs.readdirSync(source);

//     for (const file of files) {
//         const currentSource = path.join(source, file);
//         const currentDestination = path.join(destination, file);

//         if (fs.lstatSync(currentSource).isDirectory()) {
//             copyDirectory(currentSource, currentDestination);
//         } else {
//             fs.copyFileSync(currentSource, currentDestination);
//         }
//     }
// };
  
// Fonction principale
const main = () => {
    console.log("Début du traitement...");

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
            const dossierPrefix = dossier.substring(0, 8);
            console.log(`Traitement du dossier: ${dossier}`);

            const fullDossierName = findMatchingFolder(dossiersPath, dossierPrefix);
            if (!fullDossierName) {
                console.error(`Dossier non trouvé pour le préfixe: ${dossierPrefix}`);
                continue;
            }

            // Vérifier si le fichier JSX existe déjà et extraire les liens existants
            const cheminFichierJSX = path.join(dossiersjsxPath, `${dossier}.jsx`);
            const liensExistants = extraireLiensExistants(cheminFichierJSX);

            // Obtenir les notices à supprimer pour ce dossier
            const noticesToDelete = noticesToDeleteByDossier[dossier] || [];

            // Générer le contenu JSX avec les liens existants, les nouveaux, et en excluant les notices à supprimer
            const contenuJSX = genererContenu(dossierInfo, fullDossierName, liensExistants, noticesToDelete);
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

    // Copier le répertoire dossiers vers public
    // const srcDossiersPath = path.join(__dirname, "..", "dossiers");
    // const publicDossiersPath = path.join(__dirname, "..", "..", "public", "dossiers");
    
    // console.log("Copie du répertoire dossiers vers public...");
    // copyDirectory(srcDossiersPath, publicDossiersPath);
    // console.log("Copie terminée.");
};

// Exécuter le script
main();