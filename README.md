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

## 📄 API Documentation

Once the API is running, interactive documentation is available at:

- FastAPI Swagger UI: `/docs`
