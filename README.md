# Notice MLPLV

## Fonctionnement

- Lancer FolderToJSX.cjs
    - Envoie une requête HTTP vers le serveur "?"
    - Télécharge les dossiers et fichiers indiqué dans son GET vers le serveur "?"
    - Mets les dossiers dans 'appnotice/public/dossiers'
    - Génère des fichiers .JSX fonction de ce qu'il a rangé dans 'appnotice/public/dossiers'

- Lancer Clients.cjs
    - Scanne 'appnotice/public/dossiers'
    - Fais le lien entre les dossiers qui porte le même nom de "marque"
    - Créer/Met à jour un fichier .JSX qui portent le nom de la "marque"
    - Dans ce fichier .JSX fais un lien en encryptant avec RandomName.cjs les n° de dossier pour rediriger vers le fichier .JSX du n° de dossier

- Lancer LinksConverter.cjs
    - Scanne 'appnotice\src\components\dossiers_jsx'
    - Ajoute dans App.jsx les fichiers .JSX non présent dans App.jsx (Le router de l'application)

- Lancer QRCodeGenerator.cjs
    - Envoie une requête HTTP vers le serveur "?"
    - Récupère les n° de dossier dans son GET vers le serveur "?"
    - Encrypte avec RandomName.cjs les n° de dossier et y ajoute 'BaseURL' pour créer un lien fonctionnel
    - Génère le QR code avec la librairie 'qrcode'
    - Enregistre le QR code généré dans 'appnotice/public/qrcodes' avec le nom 'xx-xxxxx_qrcode.png'

## Installation

- Mettre le dossier appnotice dans le LAN
- Installer les dépendances (Node.js)
- Placer le fichier .bat dans le LAN
- Créer une tâche planifiée qui exécute le .bat