require('dotenv').config();
const fs = require("fs");
const path = require("path");

// Chemins définis dans le fichier .env
const jsonFilePath = process.env.JSON_FILE_PATH;

// Chemins des dossiers
const dossiersPath = path.join(__dirname, "..", "dossiers");
const dossiersjsxPath = path.join(__dirname, "..", "components", "dossiers_jsx");

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
const genererContenu = (dossierInfo, fullDossierName, liensExistants) => {
    const { dossier, marque, libelle, notices } = dossierInfo;
    const nomDossierFormate = formatterNomDossier(dossier);

    const tousLesLiens = [...new Set([...liensExistants, ...notices.map(notice => `/dossiers/${fullDossierName}/16 - Notice ${dossier.substring(0, 8)}/${notice}`)])];

    const noticesHTML = tousLesLiens.map(lien => {
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

// Fonction principale
const main = () => {
    console.log("Début du traitement...");

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

        // Générer le contenu JSX avec les liens existants et les nouveaux
        const contenuJSX = genererContenu(dossierInfo, fullDossierName, liensExistants);
        fs.writeFileSync(cheminFichierJSX, contenuJSX);
        console.log(`Fichier JSX mis à jour: ${dossier}.jsx`);
    }

    console.log("Traitement terminé.");
};

// Exécuter le script
main();