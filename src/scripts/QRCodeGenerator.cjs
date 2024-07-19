const fs = require('fs');
const path = require('path');
const qr = require('qrcode');
const dotenv = require('dotenv');
dotenv.config();
const generateRandomName = require('./RandomName.cjs');

const directoryPath = './src/dossiers'; // Chemin du répertoire à analyser
const outputDir = './qrcodes/'; // Dossier de sortie pour les QR codes
const baseURL = 'https://notices.marie-laure-plv.fr/';
const encryptionKey = process.env.REACT_APP_KEY;

// Création du dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Fonction pour obtenir les noms de dossiers
function getDirectoryNames(dirPath) {
  return fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

// Récupération des noms de dossiers
const directoryNames = getDirectoryNames(directoryPath);

// Génération d'un QR code pour chaque dossier
directoryNames.forEach((dirName, index) => {
  // Prendre les 8 premiers caractères du nom du dossier
  const shortName = dirName.slice(0, 8);
  
  // Nom du fichier QR code
  const outputPath = path.join(outputDir, `qrcode_${shortName}.png`);

  // Vérifier si le QR code existe déjà
  if (fs.existsSync(outputPath)) {
    console.log(`QR code pour ${dirName} existe déjà: ${outputPath}`);
    return; // Passer au dossier suivant
  }

  // Encrypter le nom court
  const encryptedName = generateRandomName(shortName, encryptionKey);

  // Création de l'URL finale
  const finalURL = baseURL + encryptedName;

  // Génération du QR code
  qr.toFile(outputPath, finalURL, {
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  }, (err) => {
    if (err) throw err;
    console.log(`QR code généré pour ${dirName}: ${outputPath}`);
  });
});