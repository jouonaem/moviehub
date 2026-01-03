# 🎬 MovieHub

## 📌 Overview

This project is a RESTful API built with FastAPI and Flask (Python) designed to extract, manage, and expose movie-related data and their associated information. The API leverages a polyglot persistence approach by combining Neo4j (graph database) and MongoDB to efficiently handle both complex relationships and flexible data structures.

---

## 🧱 Tech Stack

- Python
- FastAPI
- Flask
- MongoDB
- Neo4j
- REST API

---

## ⚙️ Features

### 🎥 MongoDB Features
- List all movies
- Retrieve a specific movie by:
  - movie name  
  - actor name
- Update information about a specific movie (movie name as parameter)

### 🔗 MongoDB & Neo4j Integration
- Return the number of movies common between MongoDB and Neo4j databases

### 🧠 Neo4j Features
- List users who rated a movie (movie name as parameter)
- Retrieve a user with:
  - number of movies rated  
  - list of rated movies (user name as parameter)

---

## 🚀 API Capabilities

- Cross-database querying (MongoDB & Neo4j)
- Graph-based relationship exploration
- Scalable and modular API architecture
- Automatic API documentation with FastAPI

---

## 🎯 Use Cases

- Movie data exploration
- Graph-based data analysis
- Educational projects on NoSQL and graph databases
- Backend and API architecture demonstrations

---

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- MongoDB (local or Atlas)
- Neo4j (local or sandbox)

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd moviehub
```

2. **Install dependencies**
```bash
cd backend
pip install -r requirements.txt
```

3. **Configure environment variables**

Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=mongodb://localhost:27017/
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_password
```

4. **Run the application**
```bash
cd backend
export FLASK_APP=app.main  # Linux/Mac
# OR
set FLASK_APP=app.main     # Windows CMD
# OR
$env:FLASK_APP = "app.main"  # Windows PowerShell

flask run
```

The API will be available at `http://127.0.0.1:5000`

---

## 📡 API Endpoints

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

## 📄 API Documentation

Once the API is running, you can test the endpoints using:

- **Postman**: Import the collection (to be created)
- **cURL**: Command-line testing
- **Browser**: For GET requests
