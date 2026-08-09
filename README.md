# Voxelaris Desktop — prototype

Prototype d'une application de bureau indépendante de distribution de contenu pour **Minecraft: Java Edition**.

> Ce dépôt est une démonstration locale. Le catalogue et les statistiques sont fictifs. L'authentification Microsoft, les téléchargements réseau et l'installation réelle dans Minecraft ne sont pas encore activés.

## Fonctions disponibles

- navigation native dans une fenêtre desktop ;
- connexion locale de démonstration clairement distincte de Microsoft OAuth ;
- catalogue fictif de mods, modpacks, resource packs et shaders ;
- recherche, filtres et affichage détaillé ;
- création et gestion locale de profils Minecraft ;
- file de téléchargements simulée ;
- calcul réel d'une empreinte SHA-256 sur le fichier de démonstration ;
- simulation contrôlée de l'installation dans un profil ;
- fonctionnement hors ligne ;
- aucune collecte de données.

## Lancer le prototype

Installez [Node.js](https://nodejs.org/) 20 ou supérieur, puis exécutez :

Sous Windows, vous pouvez simplement double-cliquer sur `INSTALLER_ET_LANCER.bat`. Lors du premier lancement, le script installe Electron puis ouvre l'application.

La méthode manuelle équivalente est :

```bash
npm install
npm start
```

Ne déposez pas le dossier `node_modules` sur GitHub : il est généré automatiquement par `npm install` et déjà exclu par `.gitignore`.

## Vérifier le code

```bash
npm run check
npm test
```

## Architecture

```text
src/
├── main/                 Processus Electron et passerelle sécurisée
│   ├── main.cjs
│   └── preload.cjs
├── renderer/             Interface et logique utilisateur
│   ├── app.js
│   ├── catalog.js
│   ├── profiles.js
│   └── downloads.js
├── styles/               Feuilles de style
│   ├── base.css
│   ├── layout.css
│   └── components.css
├── data/catalog.json     Données fictives de démonstration
└── index.html
```

Une présentation détaillée se trouve dans [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Sécurité du prototype

La fenêtre utilise l'isolation de contexte, désactive l'intégration directe de Node.js dans l'interface et n'expose qu'une API minimale validée par le processus principal. Aucune donnée utilisateur réelle, clé, jeton ou configuration de production n'est incluse.

## Licence et indépendance

Le code est distribué sous GNU AGPL-3.0-only. Voxelaris est indépendant et n'est ni affilié à, ni approuvé, ni sponsorisé par Mojang Studios ou Microsoft. Minecraft est une marque de Microsoft.
