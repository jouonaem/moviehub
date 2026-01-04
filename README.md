# MovieHub

## Overview

This project is a RESTful API built with FastAPI and Flask (Python) designed to extract, manage, and expose movie-related data and their associated information. The API leverages a polyglot persistence approach by combining Neo4j (graph database) and MongoDB to efficiently handle both complex relationships and flexible data structures.

---

## Tech Stack

- Python
- FastAPI
- Flask
- MongoDB
- Neo4j
- REST API

---

## Features

### MongoDB Features
- List all movies
- Retrieve a specific movie by:
  - movie name  
  - actor name
- Update information about a specific movie (movie name as parameter)

### MongoDB & Neo4j Integration
- Return the number of movies common between MongoDB and Neo4j databases

### Neo4j Features
- List users who rated a movie (movie name as parameter)
- Retrieve a user with:
  - number of movies rated  
  - list of rated movies (user name as parameter)

---

## API Capabilities

- Cross-database querying (MongoDB & Neo4j)
- Graph-based relationship exploration
- Scalable and modular API architecture
- Automatic API documentation with FastAPI

---

## Use Cases

- Movie data exploration
- Graph-based data analysis
- Educational projects on NoSQL and graph databases
- Backend and API architecture demonstrations

---

## Installation & Setup

### Guide d'Installation Complet

**Pour une installation détaillée étape par étape avec import du dump MongoDB, consultez :**

**[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)**

Ce guide inclut :
- Installation de tous les prérequis
- Import du dump MongoDB avec données de test
- Configuration complète du backend et frontend
- Tests et vérifications
- Résolution de problèmes courants

### Installation Rapide

#### Prerequisites
- Python 3.8+
- MongoDB (local or Atlas)
- Neo4j (local or sandbox) - *optionnel pour la partie MongoDB*

#### Quick Start

1. **Clone & Import Database**
```bash
git clone https://github.com/jouonaem/moviehub.git
cd moviehub

# Importer le dump MongoDB (données de test incluses)
mongorestore mongodb_dump/
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows PowerShell
pip install -r requirements.txt

# Créer .env avec :
# MONGO_URI=mongodb://localhost:27017/

$env:FLASK_APP = "app.main"
flask run
```

3. **Frontend Setup**
```bash
cd frontend/moviehub
npm install
npm start
```

**Backend** : http://127.0.0.1:5000  
**Swagger** : http://127.0.0.1:5000/api/docs  
**Frontend** : http://localhost:3000

---

## MongoDB Dump Inclus

Le projet inclut un dump MongoDB complet avec des données de test dans le dossier `mongodb_dump/`.

**Pour importer les données :**
```bash
mongorestore mongodb_dump/
```

Voir `mongodb_dump/README.md` pour plus de détails.

---

## API Endpoints

### MongoDB Endpoints (Movies)

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/movies/` | List all movies | - |
| POST | `/movies/` | Create a new movie | Body: `{title, year, actors, description}` |
| GET | `/movies/search` | Search movies | `?query=` or `?title=` or `?actor=` |
| GET | `/movies/<identifier>` | Get specific movie | By ID or title |
| PUT | `/movies/<identifier>` | Update movie | By title, Body: movie data |
| DELETE | `/movies/<identifier>` | Delete movie | By title |
| GET | `/movies/titles` | Get all movie titles | - |

### Neo4j Endpoints (Users & Ratings)
*To be implemented by team member*

### Mixed Endpoints (MongoDB + Neo4j)
*To be implemented together*

---

## API Documentation

### Swagger/OpenAPI

Une fois le backend démarré, la documentation interactive Swagger est disponible sur :

**http://127.0.0.1:5000/api/docs**

Vous pouvez y tester tous les endpoints directement depuis votre navigateur.

### Collection Postman

Une collection Postman complète est disponible dans le fichier `MovieHub_Postman_Collection.json` à la racine du projet.

**Pour l'importer dans Postman :**
1. Ouvrir Postman
2. Cliquer sur "Import"
3. Sélectionner le fichier `MovieHub_Postman_Collection.json`
4. La collection "MovieHub API" apparaîtra avec tous les endpoints

### Documentation complète

Consultez `DOCUMENTATION.md` pour :
- Instructions d'installation détaillées
- Configuration de MongoDB
- Exemples d'utilisation avec cURL
- Guide de dépannage
- Export/Import de la base de données
