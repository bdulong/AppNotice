# Notice MLPLV

## Fonctionnement

Voici le fonctionnement en détail de l'application Notice MLPLV, ceci montre dans l'ordre ce qu'il se passe lorsque le fichier `noticemlplv.bat` est exécuté.

`npm run gene`
- Lance FolderToJSX.cjs
    - Envoie une requête HTTP vers le serveur HTTP
    - Télécharge les dossiers et fichiers indiqué dans son GET vers le serveur HTTP
    - Mets les dossiers dans `appnotice/public/dossiers`
    - Génère des fichiers .JSX fonction de ce qu'il a rangé dans `appnotice/public/dossiers`

`npm run clients`
- Lancer Clients.cjs
    - Scanne 'appnotice/public/dossiers'
    - Fais le lien entre les dossiers qui porte le même nom de la "marque"
    - Créer/Met à jour un fichier .JSX qui portent le nom de la "marque"
    - Dans ce fichier .JSX fais un lien en encryptant avec `RandomName.cjs` les n° de dossier pour rediriger vers le fichier .JSX du n° de dossier

`npm run links`
- Lancer LinksConverter.cjs
    - Scanne `appnotice\src\components\dossiers_jsx`
    - Ajoute dans App.jsx les fichiers .JSX non présent dans App.jsx (Le router de l'application)

`npm run qr`
- Lancer QRCodeGenerator.cjs
    - Envoie une requête HTTP vers le serveur HTTP
    - Récupère les n° de dossier dans son GET vers le serveur HTTP
    - Encrypte avec `RandomName.cjs` les n° de dossier et y ajoute `BaseURL` pour créer un lien fonctionnel
    - Génère le QR code avec la librairie `qrcode`
    - Enregistre le QR code généré dans `appnotice/public/qrcodes` avec le nom `xx-xxxxx_qrcode.png`
      
`npm run build`
- Crée la build de l'application React et la range dans le dossier build situé dans `appnotice`

---

- Placer le contenu du dossier `build` dans `www/NOTICES` du serveur WAN (OVH) avec le FTP et écraser les données existantes

## Installation

- Mettre le dossier appnotice dans le LAN
- Installer la dépendance (Node.js)
- Créer une tâche planifiée qui exécute le fichier noticemlplv.bat situé dans `appnotice` du répertoire de l'application
