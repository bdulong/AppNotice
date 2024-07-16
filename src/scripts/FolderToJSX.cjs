const fs = require("fs");
const path = require("path");

const dossiersPath = path.join(__dirname, "..", "dossiers");
const dossiersjsxPath = path.join(__dirname, "..", "components", "dossiers_jsx");

// Fonction pour formater le nom du dossier (inchangée)
const formatterNomDossier = (nomDossier) => {
  let formateNom = nomDossier.replace(/\d+/g, "");
  formateNom = formateNom.replace(/-/g, "");
  formateNom = formateNom.replace(/_/g, " ");
  return formateNom.trim();
};

// Fonction modifiée pour générer le contenu
const genererContenu = (nomDossier, sousDossiers) => {
  const sousDossiersHTML = sousDossiers
    .map(sd => `
      <a 
        href={'/dossiers/${nomDossier}/16 - Notice ${nomDossier.substring(0, 8)}/${sd}'}
        target="_blank"
        rel="noopener noreferrer"
        className='CTA-notice'
      >
        <img src={'/icons/${sd}.svg'} alt={'${sd} icon'} className="button-icon" onError={(e) => {e.target.style.display = 'none'}} />
        {t('sousDossiers.${sd}')}
      </a>`)
    .join("\n")
    .replace(/\n/g, "\n\t\t\t\t\t");

  return `import React from 'react'
import { useTranslation } from 'react-i18next';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';
import CTALanguage from '../CTALanguage/CTALanguage.jsx';

const Page = () => {
    const { t } = useTranslation();

    return (
        <main>
            <Header />
            <div className='content'>
                <h1>${nomDossier.replace(/^\d+-/, '').replace(/_/g, ' ')}</h1>
                <div className='CTA-container'>
                    ${sousDossiersHTML}
                </div>
                <CTALanguage />
            </div>
        </main>
    );
};

export default Page;
`;
};

// Le reste du code reste inchangé
fs.readdir(dossiersjsxPath, (err, fichiersJSXExistants) => {
  if (err) {
    console.error('Erreur lors de la lecture du dossier "dossiers_jsx":', err);
    return;
  }

  const fichiersExistantSet = new Set(fichiersJSXExistants);

  fs.readdir(dossiersPath, (err, dossiers) => {
    if (err) {
      console.error('Erreur lors de la lecture du dossier "dossiers":', err);
      return;
    }

    dossiers.forEach((dossier) => {
      if (!/^\d{2}/.test(dossier)) {
        console.log(`Le dossier "${dossier}" ne correspond pas au format attendu.`);
        return;
      }

      const nomFichierJSX = dossier.substring(0, 8) + ".jsx";
      const cheminFichierJSX = path.join(dossiersjsxPath, nomFichierJSX);

      if (fichiersExistantSet.has(nomFichierJSX)) {
        console.log(`Le fichier ${nomFichierJSX} existe déjà.`);
      } else {
        const dossierPath = path.join(dossiersPath, dossier);

        fs.readdir(dossierPath, (err, contenuDossier) => {
          if (err) {
            console.error(`Erreur lors de la lecture du dossier "${dossierPath}":`, err);
            return;
          }

          const dossier16 = contenuDossier.find(item => item.startsWith('16'));
          
          if (!dossier16) {
            console.log(`Aucun dossier commençant par "16" trouvé dans "${dossier}".`);
            return;
          }

          const chemin16 = path.join(dossierPath, dossier16);

          fs.readdir(chemin16, (err, sousDossiers) => {
            if (err) {
              console.error(`Erreur lors de la lecture du dossier "${chemin16}":`, err);
              return;
            }

            const nomDossierFormate = formatterNomDossier(dossier);
            const contenu = genererContenu(nomDossierFormate, sousDossiers);

            if (typeof contenu !== 'string') {
              console.error(`Erreur: genererContenu a retourné ${typeof contenu} au lieu d'une chaîne de caractères.`);
              return;
            }

            fs.writeFile(cheminFichierJSX, contenu, (err) => {
              if (err) {
                console.error(`Erreur lors de la création du fichier ${nomFichierJSX}:`, err);
              } else {
                console.log(`Fichier ${nomFichierJSX} créé avec succès.`);
              }
            });
          });
        });
      }
    });
  });
});