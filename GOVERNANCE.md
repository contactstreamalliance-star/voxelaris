GOUVERNANCE DE VOXELARIS
========================

## Modèle actuel

Voxelaris suit actuellement un modèle de **mainteneur principal**. Le fondateur définit la vision, organise la feuille de route, attribue les droits d'accès et prend la décision finale sur les changements intégrés aux dépôts et services officiels.

Ce pouvoir concerne le projet officiel. Il ne réduit pas les libertés de copie, modification et redistribution accordées par la licence applicable.

## Rôles

### Contributeur

Toute personne proposant du code, de la documentation, des tests, des traductions, des rapports ou d'autres améliorations conformément à CONTRIBUTING.txt.

### Mainteneur

Une personne de confiance pouvant revoir les contributions, gérer des parties du dépôt et participer aux décisions. Son périmètre d'accès est limité au besoin.

### Mainteneur principal

La personne responsable de la direction générale, des décisions finales, des versions officielles, de l'attribution des rôles et de la gestion des incidents majeurs.

## Processus de décision

Les propositions passent normalement par une issue ou une pull request publique. Les mainteneurs recherchent un consensus fondé sur :

- l'intérêt des utilisateurs et la cohérence avec la vision ;
- la sûreté, la sécurité et la confidentialité ;
- la qualité, la testabilité et le coût de maintenance ;
- la compatibilité et l'effet sur l'écosystème ;
- les obligations légales et de licence.

En l'absence de consensus, le mainteneur principal tranche pour le projet officiel et documente la décision lorsque cela est utile et sans risque pour la sécurité.

## Intégration des changements

Les changements officiels doivent passer par pull request, revue, tests disponibles et contrôles de sécurité proportionnés au risque. En cas d'urgence de sécurité ou d'incident opérationnel, le mainteneur principal peut appliquer une correction accélérée ; une revue rétrospective doit suivre dès que raisonnablement possible.

Les droits de fusion, de publication et d'accès à l'infrastructure sont accordés progressivement, selon les contributions, la fiabilité, les besoins du projet et le principe du moindre privilège.

## Nomination et retrait des mainteneurs

Le mainteneur principal peut nommer de nouveaux mainteneurs après une période de contributions soutenues et fiables. La nomination doit préciser leur périmètre.

Un accès peut être suspendu ou retiré en cas d'inactivité prolongée, de conflit d'intérêts non géré, de violation des règles, de risque de sécurité ou à la demande de la personne concernée. Dans la mesure du possible, la décision est expliquée à la personne concernée et documentée sans divulguer d'information sensible.

## Transparence et confidentialité

Les discussions techniques et décisions ordinaires sont publiques par défaut. Restent privés lorsque nécessaire :

- vulnérabilités non corrigées et réponses aux incidents ;
- secrets, clés et certificats privés ;
- données personnelles et données utilisateurs ;
- configurations sensibles et informations opérationnelles ;
- outils internes dont la publication créerait un risque ;
- sujets juridiques, contractuels ou humains confidentiels.

## Licences

Le client et les services principaux sont destinés à être distribués sous AGPL-3.0-only. Des bibliothèques ou SDK clairement séparés pourront adopter Apache-2.0 ultérieurement. Toute exception ou évolution doit être explicite, documentée et juridiquement possible au regard des droits détenus sur le code concerné.

## Évolution de cette gouvernance

À mesure que le projet grandira, ce modèle pourra évoluer vers une équipe de mainteneurs ou une structure plus formelle. Les modifications de gouvernance passent par pull request et sont annoncées de manière visible. Elles ne peuvent retirer rétroactivement les droits déjà accordés sur des versions publiées.

## Continuité

Le mainteneur principal cherchera, lorsque le projet le permettra, à désigner des mainteneurs capables d'assurer la continuité. En cas d'indisponibilité, les forks restent possibles selon la licence, mais ne deviennent pas automatiquement le projet officiel et doivent respecter la politique de marque.
