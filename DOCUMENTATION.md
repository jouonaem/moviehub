# Documentation MovieHub

## Objectif du Projet

Application Flask permettant de gérer des films via MongoDB et des utilisateurs/notes via Neo4j, avec un frontend React moderne.

---

## Structure du Projet

```
moviehub/
├── backend/                 # API Flask
│   ├── app/
│   │   ├── config/         # Configuration MongoDB & Neo4j
│   │   ├── models/         # Modèles de données
│   │   ├── routes/         # Endpoints API
│   │   └── services/       # Logique métier
│   ├── requirements.txt    # Dépendances Python
│   └── .env               # Variables d'environnement
│
├── frontend/               # Application React
│   └── moviehub/
│       ├── src/
│       │   ├── components/ # Composants réutilisables
│       │   ├── pages/      # Pages de l'application
│       │   ├── services/   # Appels API
│       │   └── config/     # Configuration
│       └── package.json
│
└── README.md              # Documentation principale
```

---

## Installation et Démarrage

### Prérequis

- Python 3.8+
- Node.js 16+
- MongoDB (local ou Atlas)
- Neo4j (local ou sandbox) - *optionnel pour la partie MongoDB*

### 1. Installation du Backend

```bash
# Cloner le projet
git clone https://github.com/jouonaem/moviehub.git
cd moviehub/backend

# Créer un environnement virtuel
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

# Configurer les variables d'environnement
# Créer un fichier .env avec :
MONGO_URI=mongodb://localhost:27017/
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_password

# Démarrer le serveur
$env:FLASK_APP = "app.main"  # Windows PowerShell
flask run
```

Le backend sera accessible sur **http://127.0.0.1:5000**

### 2. Installation du Frontend

```bash
# Dans un nouveau terminal
cd moviehub/frontend/moviehub

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

Le frontend sera accessible sur **http://localhost:3000**

---

## Configuration de MongoDB

### Option 1 : MongoDB Local

1. Installer MongoDB : https://www.mongodb.com/try/download/community
2. Démarrer MongoDB :
   ```bash
   mongod
   ```
3. La base de données `moviehub` sera créée automatiquement

### Option 2 : MongoDB Atlas (Cloud)

1. Créer un compte sur https://www.mongodb.com/cloud/atlas
2. Créer un cluster gratuit
3. Obtenir l'URI de connexion
4. Mettre à jour le `.env` :
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/moviehub
   ```

### Importer des données de test

```bash
# Se connecter à MongoDB
mongosh

# Utiliser la base moviehub
use moviehub

# Insérer des films de test
db.movies.insertMany([
  {
    title: "Inception",
    year: 2010,
    actors: ["Leonardo DiCaprio", "Marion Cotillard", "Elliot Page"],
    description: "Un voleur qui s'infiltre dans les rêves pour voler des secrets."
  },
  {
    title: "The Matrix",
    year: 1999,
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    description: "Un hacker découvre la vraie nature de sa réalité."
  },
  {
    title: "Interstellar",
    year: 2014,
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    description: "Une équipe d'explorateurs voyage à travers un trou de ver dans l'espace."
  }
])

# Vérifier l'insertion
db.movies.find().pretty()
```

---

## Utilisation de l'API

### Exemples avec cURL

```bash
# Lister tous les films
curl http://127.0.0.1:5000/movies/

# Rechercher un film par titre
curl "http://127.0.0.1:5000/movies/search?title=Inception"

# Rechercher par acteur
curl "http://127.0.0.1:5000/movies/search?actor=Leonardo%20DiCaprio"

# Obtenir un film spécifique
curl http://127.0.0.1:5000/movies/Inception

# Créer un nouveau film
curl -X POST http://127.0.0.1:5000/movies/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Dark Knight",
    "year": 2008,
    "actors": ["Christian Bale", "Heath Ledger"],
    "description": "Batman affronte le Joker."
  }'

# Mettre à jour un film
curl -X PUT http://127.0.0.1:5000/movies/Inception \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2010,
    "description": "Description mise à jour"
  }'

# Supprimer un film
curl -X DELETE http://127.0.0.1:5000/movies/Inception
```

### Exemples avec le Frontend

1. Ouvrir http://localhost:3000
2. Voir la liste des films
3. Cliquer sur "Ajouter un film" pour créer un nouveau film
4. Cliquer sur "Voir détails" pour voir les informations complètes
5. Utiliser la page "Recherche" pour chercher des films

---

## Tests

### Tester le Backend

```bash
# Vérifier que le serveur fonctionne
curl http://127.0.0.1:5000/

# Devrait retourner : {"message": "Bienvenue sur MovieHub API"}
```

### Tester le Frontend

1. Ouvrir http://localhost:3000
2. Vérifier que les films s'affichent
3. Tester l'ajout d'un film
4. Tester la recherche
5. Tester la modification et suppression

---

## Dépannage

### Erreur CORS

Si vous voyez des erreurs CORS dans le navigateur :
- Vérifier que `Flask-CORS` est installé
- Vérifier que le backend est bien démarré sur le port 5000

### Erreur de connexion MongoDB

```
pymongo.errors.ServerSelectionTimeoutError
```

**Solutions :**
1. Vérifier que MongoDB est démarré
2. Vérifier l'URI dans le fichier `.env`
3. Vérifier les règles de pare-feu

### Le frontend ne se connecte pas au backend

1. Vérifier que le backend est démarré sur http://127.0.0.1:5000
2. Vérifier la configuration dans `frontend/moviehub/src/config/api.js`
3. Ouvrir la console du navigateur pour voir les erreurs

---

## Export/Import de la Base de Données

### Exporter la base MongoDB

```bash
# Exporter toute la base
mongodump --db moviehub --out ./dump

# Exporter uniquement la collection movies
mongodump --db moviehub --collection movies --out ./dump
```

### Importer la base MongoDB

```bash
# Importer toute la base
mongorestore --db moviehub ./dump/moviehub

# Importer uniquement la collection movies
mongorestore --db moviehub --collection movies ./dump/moviehub/movies.bson
```

---

## Équipe

- **Partie MongoDB (Films)** : Implémentée
- **Partie Neo4j (Utilisateurs)** : En cours de développement
- **Frontend** : Implémenté

---

## Notes

- Le backend utilise Flask avec une architecture modulaire
- Le frontend utilise React avec Tailwind CSS
- Les toasts remplacent les alertes natives pour une meilleure UX
- La recherche est en temps réel avec debounce
- L'architecture est prête pour l'intégration Neo4j
