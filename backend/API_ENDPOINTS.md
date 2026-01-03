# 📡 MovieHub API - Endpoints disponibles

**Base URL**: `http://127.0.0.1:5000`

---

## ✅ Endpoints MongoDB (Disponibles maintenant)

### 1. Lister tous les films
```http
GET /movies/
```

**Réponse** :
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "title": "Inception",
    "year": 2010,
    "actors": ["Leonardo DiCaprio", "Marion Cotillard"],
    "description": "A thief who steals corporate secrets..."
  }
]
```

---

### 2. Créer un nouveau film
```http
POST /movies/
Content-Type: application/json
```

**Body** :
```json
{
  "title": "The Matrix",
  "year": 1999,
  "actors": ["Keanu Reeves", "Laurence Fishburne"],
  "description": "A computer hacker learns..."
}
```

**Réponse** : `201 Created`
```json
{
  "id": "507f1f77bcf86cd799439012",
  "title": "The Matrix",
  "year": 1999,
  "actors": ["Keanu Reeves", "Laurence Fishburne"],
  "description": "A computer hacker learns..."
}
```

---

### 3. Rechercher des films
```http
GET /movies/search?query=Inception
GET /movies/search?title=Inception
GET /movies/search?actor=Leonardo DiCaprio
```

**Paramètres** :
- `query` : Recherche par titre puis par acteur
- `title` : Recherche exacte par titre (case-insensitive)
- `actor` : Recherche par nom d'acteur (case-insensitive)

**Réponse** :
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "title": "Inception",
    "year": 2010,
    "actors": ["Leonardo DiCaprio", "Marion Cotillard"],
    "description": "A thief who steals corporate secrets..."
  }
]
```

---

### 4. Obtenir un film spécifique
```http
GET /movies/Inception
GET /movies/507f1f77bcf86cd799439011
```

**Réponse** :
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Inception",
  "year": 2010,
  "actors": ["Leonardo DiCaprio", "Marion Cotillard"],
  "description": "A thief who steals corporate secrets..."
}
```

---

### 5. Mettre à jour un film
```http
PUT /movies/Inception
Content-Type: application/json
```

**Body** :
```json
{
  "year": 2010,
  "description": "Updated description..."
}
```

**Réponse** :
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Inception",
  "year": 2010,
  "actors": ["Leonardo DiCaprio", "Marion Cotillard"],
  "description": "Updated description..."
}
```

---

### 6. Supprimer un film
```http
DELETE /movies/Inception
```

**Réponse** :
```json
{
  "message": "Film supprimé avec succès"
}
```

---

### 7. Obtenir tous les titres de films
```http
GET /movies/titles
```

**Réponse** :
```json
["Inception", "The Matrix", "Interstellar", "The Dark Knight"]
```

---

## 🚧 Endpoints Neo4j (En attente - binôme)

### Lister les utilisateurs qui ont noté un film
```http
GET /users/ratings?movie=Inception
```

### Obtenir les infos d'un utilisateur
```http
GET /users/<username>
```

---

## 🔗 Endpoint mixte MongoDB + Neo4j (En attente)

### Nombre de films communs
```http
GET /stats/common-movies
```

**Réponse attendue** :
```json
{
  "count": 42,
  "common_movies": ["Inception", "The Matrix", ...],
  "mongodb_total": 100,
  "neo4j_total": 85
}
```

---

## 🔧 Codes d'erreur

| Code | Description |
|------|-------------|
| 200 | Succès |
| 201 | Créé avec succès |
| 400 | Données manquantes ou invalides |
| 404 | Ressource non trouvée |
| 500 | Erreur serveur |

---

## 🧪 Exemples avec cURL

```bash
# Lister tous les films
curl http://127.0.0.1:5000/movies/

# Rechercher un film
curl "http://127.0.0.1:5000/movies/search?query=Inception"

# Créer un film
curl -X POST http://127.0.0.1:5000/movies/ \
  -H "Content-Type: application/json" \
  -d '{"title":"The Matrix","year":1999,"actors":["Keanu Reeves"],"description":"A hacker..."}'

# Mettre à jour un film
curl -X PUT http://127.0.0.1:5000/movies/Inception \
  -H "Content-Type: application/json" \
  -d '{"year":2010,"description":"Updated..."}'
```

---

## 🎨 Exemples avec JavaScript (Frontend)

```javascript
// Lister tous les films
fetch('http://127.0.0.1:5000/movies/')
  .then(res => res.json())
  .then(movies => console.log(movies));

// Rechercher un film
fetch('http://127.0.0.1:5000/movies/search?query=Inception')
  .then(res => res.json())
  .then(movies => console.log(movies));

// Créer un film
fetch('http://127.0.0.1:5000/movies/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'The Matrix',
    year: 1999,
    actors: ['Keanu Reeves'],
    description: 'A hacker...'
  })
})
  .then(res => res.json())
  .then(movie => console.log(movie));
```
