# Guide d'Installation et d'Initialisation - MovieHub

## Objectif

Ce guide vous permet d'installer et de tester **complètement** le projet MovieHub en environnement local, conformément aux exigences du projet NoSQL.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Python 3.8+** : https://www.python.org/downloads/
- **Node.js 16+** : https://nodejs.org/
- **MongoDB Community Edition** : https://www.mongodb.com/try/download/community
- **Git** : https://git-scm.com/downloads

---

## Installation Complète (Étape par Étape)

### Étape 1 : Cloner le Projet

```bash
git clone https://github.com/jouonaem/moviehub.git
cd moviehub
```

### Étape 2 : Installer et Démarrer MongoDB

#### Windows

1. Télécharger MongoDB Community Server depuis https://www.mongodb.com/try/download/community
2. Installer avec les options par défaut
3. MongoDB démarre automatiquement comme service Windows
4. Vérifier que MongoDB fonctionne :
   ```powershell
   mongosh
   ```
   Si vous voyez le prompt MongoDB, c'est bon ! Tapez `exit` pour sortir.

#### Linux/Mac

```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Mac (avec Homebrew)
brew install mongodb-community

# Démarrer MongoDB
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # Mac
```

### Étape 3 : Importer les Données de Test

Le projet inclut un dump MongoDB avec des données de test prêtes à l'emploi.

```bash
# Se placer à la racine du projet
cd moviehub

# Importer le dump
mongorestore mongodb_dump/
```

**Vérification :**
```bash
mongosh
use moviehub
db.movies.find().pretty()
```

Vous devriez voir les films de test s'afficher.

### Étape 4 : Configurer le Backend

```bash
cd backend

# Créer un environnement virtuel Python
python -m venv venv

# Activer l'environnement virtuel
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
.\venv\Scripts\activate.bat
# Linux/Mac:
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt
```

**Créer le fichier `.env` :**

Créez un fichier `.env` dans le dossier `backend/` avec le contenu suivant :

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/

# Neo4j Configuration (optionnel pour la partie MongoDB)
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
```

### Étape 5 : Démarrer le Backend

```bash
# Toujours dans backend/ avec venv activé
$env:FLASK_APP = "app.main"  # Windows PowerShell
# OU
export FLASK_APP=app.main    # Linux/Mac

flask run
```

**Le backend est maintenant accessible sur http://127.0.0.1:5000**

**Vérification :**
Ouvrez votre navigateur et allez sur http://127.0.0.1:5000/api/docs
Vous devriez voir la documentation Swagger interactive.

### Étape 6 : Configurer et Démarrer le Frontend

**Dans un nouveau terminal :**

```bash
cd moviehub/frontend/moviehub

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

**Le frontend est maintenant accessible sur http://localhost:3000**

---

##  Tester l'Application

### Test 1 : Vérifier le Backend

```bash
# Lister tous les films
curl http://127.0.0.1:5000/movies/

# Rechercher un film
curl "http://127.0.0.1:5000/movies/search?title=Inception"
```

### Test 2 : Vérifier le Frontend

1. Ouvrir http://localhost:3000
2. Vous devriez voir les films importés depuis le dump
3. Tester l'ajout d'un nouveau film
4. Tester la recherche
5. Tester la modification et suppression

### Test 3 : Tester avec Swagger

1. Ouvrir http://127.0.0.1:5000/api/docs
2. Cliquer sur un endpoint (ex: `GET /movies/`)
3. Cliquer sur "Try it out"
4. Cliquer sur "Execute"
5. Voir la réponse

### Test 4 : Tester avec Postman

1. Ouvrir Postman
2. Importer le fichier `MovieHub_Postman_Collection.json` (à la racine du projet)
3. Tester tous les endpoints de la section "MongoDB - Movies"

---

##  Contenu du Dump MongoDB

Le dump `mongodb_dump/` contient :

- **Base de données** : `moviehub`
- **Collection** : `movies`
- **Données de test** : Films avec titre, année, acteurs, description

**Exemple de document :**
```json
{
  "_id": ObjectId("..."),
  "title": "Inception",
  "year": 2010,
  "actors": ["Leonardo DiCaprio", "Marion Cotillard", "Elliot Page"],
  "description": "Un voleur qui s'infiltre dans les rêves pour voler des secrets."
}
```

---

##  Commandes Utiles

### MongoDB

```bash
# Se connecter à MongoDB
mongosh

# Utiliser la base moviehub
use moviehub

# Voir toutes les collections
show collections

# Compter les films
db.movies.countDocuments()

# Voir tous les films
db.movies.find().pretty()

# Supprimer tous les films (attention !)
db.movies.deleteMany({})

# Réimporter le dump
mongorestore mongodb_dump/
```

### Backend

```bash
# Activer l'environnement virtuel
.\venv\Scripts\Activate.ps1  # Windows PowerShell

# Démarrer le serveur
$env:FLASK_APP = "app.main"
flask run

# Voir les logs en temps réel
# Les logs s'affichent automatiquement dans le terminal
```

### Frontend

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm start

# Build pour production
npm run build
```

---

##  Résolution de Problèmes

### Problème : MongoDB ne démarre pas

**Solution :**
```bash
# Windows : Vérifier le service
services.msc
# Chercher "MongoDB" et démarrer le service

# Linux
sudo systemctl status mongod
sudo systemctl start mongod
```

### Problème : Erreur "Module not found" dans le backend

**Solution :**
```bash
# Vérifier que l'environnement virtuel est activé
# Réinstaller les dépendances
pip install -r requirements.txt
```

### Problème : CORS Error dans le frontend

**Solution :**
1. Vérifier que le backend est démarré sur http://127.0.0.1:5000
2. Vérifier que `flask-cors` est installé : `pip install flask-cors`
3. Redémarrer le backend

### Problème : Le dump ne s'importe pas

**Solution :**
```bash
# Vérifier que MongoDB est démarré
mongosh

# Importer avec plus de détails
mongorestore --verbose mongodb_dump/

# Si le dossier est différent
mongorestore --db moviehub mongodb_dump/moviehub/
```

---

##  Architecture du Projet

```
moviehub/
├── backend/                    # API Flask
│   ├── app/
│   │   ├── config/            # Configuration MongoDB & Neo4j
│   │   │   ├── mongo.py       # Connexion MongoDB
│   │   │   └── neo4j.py       # Connexion Neo4j (à implémenter)
│   │   ├── models/            # Modèles de données
│   │   │   ├── movie.py       # Modèle Film
│   │   │   └── user.py        # Modèle User (à implémenter)
│   │   ├── routes/            # Endpoints API
│   │   │   ├── movies.py      # Routes MongoDB
│   │   │   ├── users.py       # Routes Neo4j (à implémenter)
│   │   │   └── stats.py       # Routes mixtes (à implémenter)
│   │   └── services/          # Logique métier
│   │       ├── movie_service.py    # Service MongoDB
│   │       ├── user_service.py     # Service Neo4j (à implémenter)
│   │       └── common_service.py   # Service mixte (à implémenter)
│   ├── requirements.txt       # Dépendances Python
│   └── .env                   # Variables d'environnement
│
├── frontend/                  # Application React
│   └── moviehub/
│       ├── src/
│       │   ├── components/    # Composants réutilisables
│       │   ├── pages/         # Pages de l'application
│       │   ├── services/      # Appels API
│       │   └── config/        # Configuration
│       └── package.json
│
├── mongodb_dump/              #  Dump MongoDB avec données de test
│   └── moviehub/
│       └── movies.bson
│
├── backend/swagger.json       # Documentation OpenAPI
├── MovieHub_Postman_Collection.json  # Collection Postman
├── README.md                  # Documentation principale
├── DOCUMENTATION.md           # Documentation détaillée
└── INSTALLATION_GUIDE.md      # Ce fichier
```

---

##  Checklist de Vérification

Avant de considérer l'installation comme réussie, vérifiez :

- [ ] MongoDB est installé et démarré
- [ ] Le dump a été importé avec succès
- [ ] L'environnement virtuel Python est créé et activé
- [ ] Les dépendances Python sont installées
- [ ] Le fichier `.env` est créé avec les bonnes valeurs
- [ ] Le backend démarre sans erreur sur http://127.0.0.1:5000
- [ ] Swagger est accessible sur http://127.0.0.1:5000/api/docs
- [ ] Les dépendances Node.js sont installées
- [ ] Le frontend démarre sans erreur sur http://localhost:3000
- [ ] Les films s'affichent dans le frontend
- [ ] Les opérations CRUD fonctionnent (créer, lire, modifier, supprimer)

---

##  Support

En cas de problème :

1. Vérifier les logs du backend (dans le terminal où Flask tourne)
2. Vérifier la console du navigateur (F12) pour le frontend
3. Consulter la section "Résolution de Problèmes" ci-dessus
4. Vérifier que toutes les étapes ont été suivies dans l'ordre

---

