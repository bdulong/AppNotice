const fs = require('fs');
const path = require('path');
const generateRandomName = require('./RandomName.cjs');
const dotenv = require('dotenv');
dotenv.config();

const dossiersPath = path.join(__dirname, '..', 'dossiers');
const outputPath = path.join(__dirname, '..', 'components', 'dossiers_jsx');

// Fonction pour formater le nom du dossier
const formatDossierName = (name) => {
  return name.replace(/[_\-\.]/g, ' ').trim();
};

// Fonction pour créer un nom de variable valide
const createValidVariableName = (name) => {
  return name.replace(/[^a-zA-Z0-9]/g, '');
};

// Fonction pour générer le contenu JSX
const generateJSXContent = (commonName, dossierNumbers) => {
  const links = dossierNumbers.map(num => {
    const encryptedNum = generateRandomName(num, process.env.REACT_APP_KEY);
    return `
    <div className="CTA-notice">
      <a 
        href={'/${encryptedNum}'}
        onClick={(e) => {
          e.preventDefault();
          navigate('/${encryptedNum}');
        }}
        className="dossier-link"
      >
        <h2>{t('dossiers.${num}')}</h2>
      </a>
    </div>
  `;
  }).join('\n');

  const componentName = createValidVariableName(commonName);

  return `
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';

const ${componentName}Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main>
      <Header />
      <div className='content'>
        <h1>${formatDossierName(commonName)}</h1>
        <div className='CTA-container'>
          ${links}
        </div>
      </div>
    </main>
  );
};

export default ${componentName}Page;
  `;
};

// Lecture du répertoire "dossiers"
fs.readdir(dossiersPath, (err, dossiers) => {
  if (err) {
    console.error('Erreur lors de la lecture du dossier "dossiers":', err);
    return;
  }

  const groupedDossiers = {};

  // Grouper les dossiers par nom commun
  dossiers.forEach(dossier => {
    const numDossier = dossier.substring(0, 8);
    const resteDossier = dossier.substring(8);

    if (!groupedDossiers[resteDossier]) {
      groupedDossiers[resteDossier] = [];
    }
    groupedDossiers[resteDossier].push(numDossier);
  });

  // Créer les fichiers JSX pour chaque groupe
  Object.entries(groupedDossiers).forEach(([commonName, dossierNumbers]) => {
    if (dossierNumbers.length > 1) {
      const fileName = `${createValidVariableName(commonName)}.jsx`;
      const filePath = path.join(outputPath, fileName);
      const content = generateJSXContent(commonName, dossierNumbers);

      fs.writeFile(filePath, content, (err) => {
        if (err) {
          console.error(`Erreur lors de la création du fichier ${fileName}:`, err);
        } else {
          console.log(`Fichier ${fileName} créé avec succès.`);
        }
      });
    }
  });
});