require('dotenv').config();
const fs = require('fs');
const path = require('path');
const generateRandomName = require('./RandomName.cjs');

// Indique où trouver App.jsx (fichier de routage de l'application)
const appFilePath = process.env.APP_FILE_PATH;

// Indique le dossier qui contient les pages JSX à répertorier 
// dans le routage de App.jsx
const componentsDir = process.env.COMPONENTS_DIR;

const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.jsx'));

if (files.length === 0) {
    console.error('Aucun fichier .jsx trouvé dans le dossier dossiers_jsx.');
    process.exit(1);
}

let appFileContent = fs.readFileSync(appFilePath, 'utf-8');

const key = process.env.REACT_APP_KEY;

if (!key) {
    console.error('La clé REACT_APP_KEY n\'est pas définie dans le fichier .env.');
    process.exit(1);
}

// Générer les nouvelles lignes d'import et de Route
const newImportsAndRoutes = files.map(file => {
    const randomName = generateRandomName(file.substring(0, 8), key);
    const importLine = `import ${randomName} from './components/dossiers_jsx/${file}';`;
    const routeLine = `\t\t\t\t\t\t<Route path="/${randomName}" element={<${randomName} />} />`;
    return { importLine, routeLine, randomName };
});

// Vérifier si les lignes d'import et de Route existent déjà
const existingImports = new Set(appFileContent.match(/import .+ from '.\/components\/dossiers_jsx\/.+\.jsx';/g) || []);
const existingRoutes = new Set(appFileContent.match(/<Route path="\/.+" element={<.+ \/>} \/>/g) || []);

const uniqueImportsAndRoutes = newImportsAndRoutes.filter(({ importLine, routeLine, randomName }) => 
    !existingImports.has(importLine) && !existingRoutes.has(routeLine) && !appFileContent.includes(randomName)
);

if (uniqueImportsAndRoutes.length > 0) {
    const lines = appFileContent.split('\n');
    let importInsertIndex = lines.findIndex(line => line.includes('// Fin des imports des pages générées par LinksConverter.cjs'));
    let routeInsertIndex = lines.findIndex(line => line.includes('{/* Fin des routes des pages générées par LinksConverter.cjs */}'));

    if (importInsertIndex === -1 || routeInsertIndex === -1) {
        console.error('Les marqueurs de début ou de fin n\'ont pas été trouvés dans le fichier App.jsx.');
        process.exit(1);
    }

    // Insérer les nouvelles lignes d'import
    lines.splice(importInsertIndex, 0, ...uniqueImportsAndRoutes.map(({ importLine }) => importLine));

    // Insérer les nouvelles lignes de Route
    lines.splice(routeInsertIndex, 0, ...uniqueImportsAndRoutes.map(({ routeLine }) => routeLine));

    // Réécrire le fichier App.jsx avec les nouvelles lignes
    appFileContent = lines.join('\n');
    fs.writeFileSync(appFilePath, appFileContent, 'utf-8');

    console.log(`Nouvelles lignes d'import ajoutées : \n${uniqueImportsAndRoutes.map(({ importLine }) => importLine).join('\n')}`);
    console.log(`Nouvelles lignes <Route> ajoutées : \n${uniqueImportsAndRoutes.map(({ routeLine }) => routeLine).join('\n')}`);
} else {
    console.log('Aucune nouvelle ligne à ajouter.');
}