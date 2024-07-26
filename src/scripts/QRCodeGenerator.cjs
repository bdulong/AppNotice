const fs = require('fs');
const path = require('path');
const qr = require('qrcode');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const generateRandomName = require('./RandomName.cjs');

// URL de base de l'API sans la date
const apiQR = process.env.API_QR;
// Dossier de sortie pour les QR codes
const outputDir = process.env.OUTPUTDIR; 
// Indique le début de l'URL à mettre avant l'url encrypté
const baseURL = process.env.BASEURL;
// Clé d'encryptage
const encryptionKey = process.env.REACT_APP_KEY;

// Fonction pour obtenir la date d'hier au format DD/MM/YYYY
function getYesterdayDate() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toLocaleDateString('fr-FR', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '/');
}

// Création du dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Fonction pour récupérer les numéros de dossier depuis l'API
async function getDirectoryNames() {
  const yesterdayDate = getYesterdayDate();
  const apiUrl = `${apiQR}&from=${yesterdayDate}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.done;
  } catch (error) {
    console.error('Erreur lors de la récupération des numéros de dossier:', error);
    return [];
  }
}

// Fonction principale asynchrone
async function generateQRCodes() {
  const directoryNames = await getDirectoryNames();

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
}

// Appel de la fonction principale
generateQRCodes();