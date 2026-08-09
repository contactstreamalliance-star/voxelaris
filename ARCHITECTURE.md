# Architecture du prototype

## Objectif

Cette première version démontre l'expérience utilisateur du futur client desktop sans dépendre d'un serveur, d'un compte Microsoft ou d'une installation Minecraft réelle.

## Séparation des responsabilités

- `src/main/main.cjs` crée la fenêtre, applique les restrictions Electron et traite les opérations privilégiées.
- `src/main/preload.cjs` expose une passerelle très réduite entre l'interface et le système.
- `src/renderer/app.js` orchestre la navigation et le rendu général.
- `catalog.js`, `profiles.js` et `downloads.js` isolent les domaines fonctionnels.
- `catalog.json` fournit des données fictives faciles à remplacer par une future API.

## Données locales

Les profils et préférences sont stockés uniquement dans le stockage local Electron. Cette solution convient au prototype, mais devra être remplacée par un stockage versionné et chiffré pour les informations sensibles.

## Limites intentionnelles

- aucune authentification Microsoft ;
- aucun téléchargement Internet ;
- aucune écriture dans le dossier Minecraft ;
- aucune exécution de fichier téléchargé ;
- aucun backend ou compte Voxelaris ;
- aucun catalogue CurseForge ou Modrinth.

## Prochaine étape technique

Le passage à une alpha pourra ajouter une API versionnée, un stockage de profils robuste, l'authentification Microsoft, un gestionnaire de fichiers temporaire, la validation des manifestes et une installation transactionnelle avec retour arrière.
