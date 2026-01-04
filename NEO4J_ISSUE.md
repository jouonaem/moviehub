[Neo4j Sandbox – Problème de connexion]

Contexte :
- Projet MovieHub (backend Python / Flask)
- Objectif : connexion à une base Neo4j Sandbox via le driver Python officiel
- Python 3.13 sur Windows

Ce qui fonctionne :
- Accès à Neo4j Sandbox via le navigateur (Neo4j Browser)
- Credentials valides (user / password)
- Réseau OK : port 7687 accessible
  Test-NetConnection <sandbox>.neo4jsandbox.com -Port 7687 => True

Configuration testée :
- URIs :
  - bolt://<ip>:7687
  - bolt+s://<sandbox>.neo4jsandbox.com:7687
  - neo4j+s://<sandbox>.neo4jsandbox.com
- Driver : neo4j (officiel)
- Variables d’environnement via .env
- Connexion simple testée : RETURN 1

Erreurs rencontrées :
- ImportError (fichier local nommé neo4j.py) → corrigé
- ModuleNotFoundError → corrigé
- ConfigurationError SSL → corrigé
- Erreur bloquante persistante :
  neo4j.exceptions.ServiceUnavailable
  Cannot connect to Bolt service (looks like HTTP)
  Unable to retrieve routing information

Tentatives de résolution :
- Suppression de toute config SSL manuelle
- Changement de schéma (bolt / bolt+s / neo4j+s)
- Test avec et sans encrypted
- Test hors Flask (script minimal)
- Test réseau et firewall

Résultat :
- Échec systématique de la connexion via le driver Python
- Problème non reproductible depuis Neo4j Browser

Conclusion :
- Problème probablement lié à Neo4j Sandbox (routing / SSL)
  ou à une incompatibilité avec Python 3.13
- Blocage non résolu
- Neo4j mis de côté temporairement pour poursuivre le projet
