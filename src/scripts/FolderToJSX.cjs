const fs = require("fs");
const path = require("path");

const dossiersPath = path.join(__dirname, "..", "dossiers");
const dossiersjsxPath = path.join(__dirname, "..", "components", "dossiers_jsx");

const formatterNomDossier = (nomDossier) => {
  let formateNom = nomDossier.replace(/\d+/g, "");
  formateNom = formateNom.replace(/-/g, "");
  formateNom = formateNom.replace(/_/g, " ");
  return formateNom.trim();
};

const getPDFFiles = (dir) => {
  const files = fs.readdirSync(dir)
    .filter(file => file.toLowerCase().endsWith('.pdf'));
  if (files.length > 0) {
    return [{ name: path.parse(files[0]).name, fullPath: files[0] }];
  }
  return [];
};

const genererContenu = (nomDossierFormate, nomDossierOriginal, sousDossiers) => {
  const sousDossiersHTML = sousDossiers
  .map(sd => {
    const pdfFiles = getPDFFiles(path.join(dossiersPath, nomDossierOriginal, `16 - Notice ${nomDossierOriginal.substring(0, 8)}`, sd));
    if (pdfFiles.length > 0) {
      const pdf = pdfFiles[0];
      const filePath = `${nomDossierOriginal}/16 - Notice ${nomDossierOriginal.substring(0, 8)}/${sd}/${pdf.fullPath}`;
      return `
      <div className='CTA-notice'>
        <a 
          href={'#file=' + btoa('${filePath}')}
          onClick={(e) => {
            e.preventDefault();
            window.openPDF('${filePath}');
          }}
          className='PDF-link'
        >
          <img src={'/icons/${sd}.svg'} alt={'${sd} icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
          <h2>{t('sousDossiers.${sd}')}</h2>
        </a>
      </div>`;
    }
    return '';
  })
  .filter(Boolean)
  .join("\n")
  .replace(/\n/g, "\n\t\t\t\t\t");

  return `import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';
import CTALanguage from '../CTALanguage/CTALanguage.jsx';

const Page = () => {
    const { t } = useTranslation();

    useEffect(() => {
      window.openPDF = (filePath) => {
        window.open('/dossiers/' + filePath, '_blank');
      };
    }, []);

    return (
        <main>
            <Header />
            <div className='content'>
                <h1>${nomDossierFormate.replace(/^\d+-/, '').replace(/_/g, ' ')}</h1>
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

    dossiers.forEach((dossierOriginal) => {
      if (!/^\d{2}/.test(dossierOriginal)) {
        console.log(`Le dossier "${dossierOriginal}" ne correspond pas au format attendu.`);
        return;
      }

      const nomFichierJSX = dossierOriginal.substring(0, 8) + ".jsx";
      const cheminFichierJSX = path.join(dossiersjsxPath, nomFichierJSX);

      if (fichiersExistantSet.has(nomFichierJSX)) {
        console.log(`Le fichier ${nomFichierJSX} existe déjà.`);
      } else {
        const dossierPath = path.join(dossiersPath, dossierOriginal);

        fs.readdir(dossierPath, (err, contenuDossier) => {
          if (err) {
            console.error(`Erreur lors de la lecture du dossier "${dossierPath}":`, err);
            return;
          }

          const dossier16 = contenuDossier.find(item => item.startsWith('16'));
          
          if (!dossier16) {
            console.log(`Aucun dossier commençant par "16" trouvé dans "${dossierOriginal}".`);
            return;
          }

          const chemin16 = path.join(dossierPath, dossier16);

          fs.readdir(chemin16, (err, sousDossiers) => {
            if (err) {
              console.error(`Erreur lors de la lecture du dossier "${chemin16}":`, err);
              return;
            }

            const nomDossierFormate = formatterNomDossier(dossierOriginal);
            const contenu = genererContenu(nomDossierFormate, dossierOriginal, sousDossiers);

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