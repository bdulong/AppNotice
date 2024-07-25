const fs = require('fs');
const path = require('path');
const qr = require('qrcode');
const dotenv = require('dotenv');
dotenv.config();
const generateRandomName = require('./RandomName.cjs');

// Chemin du fichier JSON à lire
const jsonFilePath = process.env.JSON_QR; 
// Dossier de sortie pour les QR codes
const outputDir = process.env.OUTPUTDIR; 
// Indique le début de l'URL à mettre avant l'url encrypté
const baseURL = process.env.BASEURL;
// Clé d'encryptage
const encryptionKey = process.env.REACT_APP_KEY;

// Création du dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Lecture du fichier JSON
function readJSONFile(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

// Récupération des noms à partir du fichier JSON
const jsonData = readJSONFile(jsonFilePath);
const directoryNames = jsonData.done;

// Génération d'un QR code pour chaque nom
directoryNames.forEach((dirName) => {
  // Prendre les 8 premiers caractères du nom
  const shortName = dirName.slice(0, 8);
  
  // Nom du fichier QR code
  const outputPath = path.join(outputDir, `${shortName}_qrcode.png`);

  // Vérifier si le QR code existe déjà
  if (fs.existsSync(outputPath)) {
    console.log(`QR code pour ${dirName} existe déjà: ${outputPath}`);
    return; // Passer au nom suivant
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