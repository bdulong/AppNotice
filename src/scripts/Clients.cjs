require('dotenv').config();
const fs = require('fs');
const path = require('path');
const generateRandomName = require('./RandomName.cjs');

// Chemin vers "dossiers" (contient les fichiers et l'arborescence 
// de l'application c'est le dossier vers lequel on IMPORTE via l'interface
// les fichiers et dossier d'Esperanto)
const dossiersPath = process.env.DOSSIERS_PATH;

// Utilisé par Clients.cjs pour ranger les fichiers JSX  
// des répertoires clients
const outputPath = process.env.DOSSIERS_PATH_JSX;

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
    <a 
      href={'/${encryptedNum}'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open('/${encryptedNum}', '_blank', 'noopener,noreferrer');
      }}
      className="dossier-link"
    >
      <div className="CTA-notice">
        <h2>{t('dossiers')} ${num}</h2>
      </div>
    </a>
  `;
  }).join('\n');

  const componentName = createValidVariableName(commonName);

  return `
import React from 'react';
import { useTranslation } from 'react-i18next';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';
import CTALanguage from '../CTALanguage/CTALanguage.jsx';

const ${componentName}Page = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Header />
      <div className='content'>
        <h1>${formatDossierName(commonName)}</h1>
        <div className='CTA-container'>
          ${links}
        </div>
        <CTALanguage />
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