from neo4j import GraphDatabase
import os
print(os.getenv("NEO4J_PASSWORD"))
class Neo4jConnection:
    def __init__(self):
        self.uri = os.getenv(
            "NEO4J_URI",
            "bolt://3.84.190.157:7687"
        )
        self.user = os.getenv("NEO4J_USER", "neo4j")
        self.password = os.getenv("space-mat-networks")

        self.driver = GraphDatabase.driver(
            self.uri,
            auth=(self.user, self.password),
            encrypted=False
        )

    def close(self):
        self.driver.close()

    def query(self, query, parameters=None):
        with self.driver.session() as session:
            result = session.run(query, parameters or {})
            return [record.data() for record in result]


neo4j_conn = Neo4jConnection()