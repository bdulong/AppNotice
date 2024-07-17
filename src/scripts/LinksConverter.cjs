const fs = require('fs');
const path = require('path');
const generateRandomName = require('./RandomName.cjs');
const dotenv = require('dotenv');
dotenv.config();

const appFilePath = path.join(__dirname, '../App.jsx');
const componentsDir = path.join(__dirname, '../components/dossiers_jsx');

// Récupérer le nom de fichier du dossier "dossiers_jsx"
const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.jsx'));

if (files.length === 0) {
	console.error('Aucun fichier .jsx trouvé dans le dossier dossiers_jsx.');
	process.exit(1);
}

// Lire le contenu de App.jsx
let appFileContent = fs.readFileSync(appFilePath, 'utf-8');

// Insérer les nouvelles lignes après la 9ème
const lines = appFileContent.split('\n');
if (lines.length < 9) {
	console.error('Le fichier App.jsx ne contient pas assez de lignes.');
	process.exit(1);
}

// Clé pour la génération des noms
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
	return { importLine, routeLine };
});

// Vérifier si les lignes d'import existent déjà et ajouter seulement les nouvelles
const existingImports = new Set(lines.filter(line => line.startsWith('import ')));
const uniqueImports = newImportsAndRoutes.filter(({ importLine }) => !existingImports.has(importLine));

// Ajouter les nouvelles lignes après la 9ème ligne
if (uniqueImports.length > 0) {
	let landingRouteIndex = -1;

	for (let i = 0; i < lines.length; i++) {
		if (lines[i].includes('{/* Routes des pages générées par LinksConverter.cjs */}')) {
			landingRouteIndex = i;
			break;
		}
	}

	if (landingRouteIndex === -1) {
		console.error('La ligne {/* Routes des pages générées par LinksConverter.cjs */} n\'a pas été trouvée dans le fichier App.jsx.');
		process.exit(1);
	}

	// Insérer les nouvelles lignes après la ligne {/* Routes des pages générées par LinksConverter.cjs */}
	lines.splice(landingRouteIndex + 1, 0, ...uniqueImports.map(({ routeLine }) => routeLine));

	// Insérer les nouvelles lignes d'import après la 9ème ligne
	lines.splice(9, 0, ...uniqueImports.map(({ importLine }) => importLine));

	// Réécrire le fichier App.jsx avec les nouvelles lignes
	appFileContent = lines.join('\n');
	fs.writeFileSync(appFilePath, appFileContent, 'utf-8');

	console.log(`Lignes d'import ajoutées : \n${uniqueImports.map(({ importLine }) => importLine).join('\n')}`);
	console.log(`Lignes <Route> ajoutées : \n${uniqueImports.map(({ routeLine }) => routeLine).join('\n')}`);
} else {
	console.log('Aucune nouvelle ligne à ajouter.');
}