# 📦 MongoDB Dump - MovieHub

## 📄 Description

Ce dossier contient un dump complet de la base de données MongoDB utilisée par MovieHub.

## 🗂️ Contenu

- **Base de données** : `moviehub`
- **Collection** : `movies`
- **Format** : BSON (Binary JSON)

## 📊 Structure des Documents

Chaque document dans la collection `movies` contient :

```json
{
  "_id": ObjectId("..."),
  "title": "Titre du film",
  "year": 2024,
  "actors": ["Acteur 1", "Acteur 2", "Acteur 3"],
  "description": "Description du film"
}
```

### Champs

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Oui (auto) | Identifiant unique MongoDB |
| `title` | String | Oui | Titre du film |
| `year` | Integer | Oui | Année de sortie |
| `actors` | Array[String] | Oui | Liste des acteurs |
| `description` | String | Non | Description/synopsis du film |

## 🚀 Importation

### Méthode 1 : Import Complet

```bash
# Depuis la racine du projet moviehub/
mongorestore mongodb_dump/
```

Cette commande va :
1. Créer la base de données `moviehub` si elle n'existe pas
2. Créer la collection `movies`
3. Importer tous les documents

### Méthode 2 : Import Spécifique

```bash
# Importer uniquement la collection movies
mongorestore --db moviehub --collection movies mongodb_dump/moviehub/movies.bson
```

### Méthode 3 : Import avec Remplacement

```bash
# Supprimer les données existantes avant l'import
mongorestore --drop mongodb_dump/
```

## ✅ Vérification de l'Import

Après l'import, vérifiez que les données sont bien présentes :

```bash
# Se connecter à MongoDB
mongosh

# Utiliser la base moviehub
use moviehub

# Compter les documents
db.movies.countDocuments()

# Afficher tous les films
db.movies.find().pretty()

# Afficher uniquement les titres
db.movies.find({}, {title: 1, year: 1, _id: 0})
```

## 📝 Données de Test Incluses

Le dump contient des films de test pour démontrer les fonctionnalités de l'API :

- Films avec différentes années de sortie
- Films avec plusieurs acteurs
- Films avec descriptions complètes
- Données réalistes pour tester les recherches

## 🔄 Créer un Nouveau Dump

Si vous avez modifié la base de données et souhaitez créer un nouveau dump :

```bash
# Depuis la racine du projet
mongodump --db moviehub --out mongodb_dump/
```

## 🗑️ Réinitialiser la Base de Données

Pour repartir de zéro avec les données de test :

```bash
# Se connecter à MongoDB
mongosh

# Utiliser la base moviehub
use moviehub

# Supprimer tous les films
db.movies.deleteMany({})

# Quitter mongosh
exit

# Réimporter le dump
mongorestore mongodb_dump/
```

## 📋 Exemples de Requêtes

Une fois les données importées, vous pouvez tester ces requêtes :

```javascript
// Trouver tous les films
db.movies.find()

// Trouver un film par titre (case-insensitive)
db.movies.find({title: /inception/i})

// Trouver les films d'un acteur
db.movies.find({actors: /Leonardo DiCaprio/i})

// Trouver les films après 2010
db.movies.find({year: {$gte: 2010}})

// Compter les films par année
db.movies.aggregate([
  {$group: {_id: "$year", count: {$sum: 1}}},
  {$sort: {_id: -1}}
])
```

## 🎯 Utilisation avec l'API

Une fois le dump importé, l'API MovieHub peut :

- Lister tous les films : `GET /movies/`
- Rechercher par titre : `GET /movies/search?title=Inception`
- Rechercher par acteur : `GET /movies/search?actor=Leonardo DiCaprio`
- Obtenir un film : `GET /movies/Inception`
- Créer un film : `POST /movies/`
- Modifier un film : `PUT /movies/Inception`
- Supprimer un film : `DELETE /movies/Inception`

## 📚 Documentation Complète

Pour plus d'informations :
- **Installation** : Voir `INSTALLATION_GUIDE.md`
- **Utilisation de l'API** : Voir `DOCUMENTATION.md`
- **Vue d'ensemble** : Voir `README.md`

## ⚠️ Notes Importantes

1. **Ne pas commiter de données sensibles** : Ce dump contient uniquement des données de test publiques
2. **Format BSON** : Les fichiers `.bson` ne sont pas lisibles directement, utilisez `mongorestore`
3. **Compatibilité** : Ce dump a été créé avec MongoDB 6.x et est compatible avec les versions ultérieures
4. **Taille** : Le dump est volontairement petit pour faciliter les tests et le partage

## 🔒 Sécurité

Ce dump est destiné à un environnement de développement/test uniquement. Pour la production :
- Utilisez des données réelles
- Configurez l'authentification MongoDB
- Utilisez des connexions sécurisées (TLS/SSL)
- Limitez les accès réseau

---

**Créé pour le projet NoSQL - MovieHub**
