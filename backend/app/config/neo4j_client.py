import os
from neo4j import GraphDatabase, exceptions
from dotenv import load_dotenv

# Charge les variables d'environnement depuis .env
load_dotenv()

class Neo4jConnection:
    def __init__(self):
        self.uri = os.getenv("NEO4J_URI")
        self.user = os.getenv("NEO4J_USER")
        self.password = os.getenv("NEO4J_PASSWORD")

        if not all([self.uri, self.user, self.password]):
            raise ValueError("Veuillez définir NEO4J_URI, NEO4J_USER et NEO4J_PASSWORD dans le .env")

        try:
            self.driver = GraphDatabase.driver(
                self.uri,
                auth=(self.user, self.password)
            )
            # Test de connexion
            with self.driver.session() as session:
                session.run("RETURN 1")
            print("Connexion à Neo4j réussie ✅")
        except exceptions.Neo4jError as e:
            print(f"Erreur de connexion Neo4j : {e}")
            raise

    def close(self):
        self.driver.close()

    def query(self, query, parameters=None):
        try:
            with self.driver.session() as session:
                result = session.run(query, parameters or {})
                return [record.data() for record in result]
        except exceptions.Neo4jError as e:
            print(f"Erreur lors de l'exécution de la requête : {e}")
            return []

    # --- Fonctions utilitaires pour MovieHub ---
    def get_all_movies(self):
        query = "MATCH (m:Movie) RETURN m.title AS title, m.year AS year, m.genre AS genre"
        return self.query(query)

    def get_all_users(self):
        query = "MATCH (u:User) RETURN u.name AS name, u.email AS email"
        return self.query(query)


# Instance globale à utiliser dans le projet
neo4j_conn = Neo4jConnection()

# Test rapide
if __name__ == "__main__":
    print(neo4j_conn.get_all_movies())
    print(neo4j_conn.get_all_users())