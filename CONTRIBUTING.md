CONTRIBUER À VOXELARIS
======================

Merci de votre intérêt pour Voxelaris. Ce document décrit le processus attendu pour proposer une modification au projet officiel.

## Avant de commencer

- Pour un changement important, ouvrez d'abord une discussion ou une issue afin de valider l'orientation.
- Vérifiez qu'aucune issue ou pull request existante ne couvre déjà le sujet.
- Ne divulguez jamais publiquement une vulnérabilité non corrigée ; suivez SECURITY.txt.

## Contenu interdit dans le dépôt public

Une contribution ne doit contenir aucun :

- mot de passe, jeton, secret ou clé d'API ;
- certificat privé ou clé cryptographique privée ;
- donnée personnelle ou donnée utilisateur réelle ;
- configuration de production sensible ;
- accès, sauvegarde ou export d'un système officiel ;
- outil interne à risque ou détail opérationnel facilitant une attaque ;
- contenu dont vous ne détenez pas les droits nécessaires.

Utilisez des valeurs fictives clairement identifiées pour les exemples. Si un secret est publié par erreur, considérez-le comme compromis, faites-le révoquer et contactez les mainteneurs par le canal privé défini dans `SECURITY.md`.

## Processus de contribution

1. Créez un fork et une branche dédiée.
2. Limitez la modification à un objectif cohérent.
3. Ajoutez ou adaptez les tests et la documentation utiles.
4. Exécutez les tests, le formatage et les contrôles de sécurité disponibles.
5. Ouvrez une pull request en expliquant le besoin, la solution, les risques et la manière de vérifier le changement.
6. Répondez aux retours de revue. Une approbation ne garantit pas une fusion immédiate.

Toute contribution doit passer par une pull request. Le mainteneur peut demander des modifications, refuser une proposition hors périmètre ou fermer une proposition inactive.

## Exigences de qualité et de sécurité

Une pull request doit, selon sa nature :

- réussir les vérifications automatisées disponibles ;
- inclure des tests adaptés au risque ;
- préserver la compatibilité ou documenter explicitement toute rupture ;
- éviter les dépendances inutiles et justifier les nouvelles dépendances ;
- ne pas réduire les protections de sécurité ou de confidentialité ;
- documenter les migrations, permissions et changements de configuration ;
- rester lisible et suffisamment ciblée pour être revue sérieusement.

Les changements sensibles peuvent nécessiter une revue supplémentaire, un audit ou être développés hors du dépôt public jusqu'à ce que leur publication soit sûre.

## Licence des contributions

En soumettant une contribution, vous certifiez être autorisé à le faire et acceptez qu'elle soit distribuée sous la licence applicable au composant concerné, sans imposer de condition supplémentaire.

Par défaut, les contributions au client et aux services principaux sont proposées sous **AGPL-3.0-only**. Un composant distinct explicitement placé sous Apache-2.0 conserve cette licence. N'ajoutez pas ou ne modifiez pas un en-tête de licence sans accord préalable des mainteneurs.

Vous conservez les droits d'auteur sur votre contribution. Aucun transfert général de droits d'auteur n'est demandé par ce document.

## Conduite

Soyez respectueux, précis et constructif. Le harcèlement, les attaques personnelles, la discrimination, le spam et la divulgation d'informations privées ne sont pas acceptés. Les mainteneurs peuvent modérer les espaces du projet afin de préserver une collaboration sûre.

## Décisions

Les décisions d'intégration suivent GOVERNANCE.txt. Une contribution peut être techniquement valide sans être retenue si elle ne correspond pas à la vision, au périmètre, aux contraintes de maintenance ou aux exigences de sécurité du projet officiel. Cela n'empêche pas les usages et forks autorisés par la licence.
