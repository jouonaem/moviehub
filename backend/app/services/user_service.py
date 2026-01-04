from app.config.neo4j_client import get_neo4j_conn

def get_all_neo4j_movies():
    conn = get_neo4j_conn()
    return conn.query("MATCH (m:Movie) RETURN m")

def get_users_who_rated_movie(movie_title):
    query = """
    MATCH (u:User)-[:RATED]->(m:Movie {title: $title})
    RETURN u.name AS user
    """
    return get_neo4j_conn.query(query, {"title": movie_title})

def get_user_details(username):
    query = """
    MATCH (u:User {name: $name})-[:RATED]->(m:Movie)
    RETURN u.name AS user,
           count(m) AS total_movies,
           collect(m.title) AS movies
    """
    result = get_neo4j_conn.query(query, {"name": username})
    return result[0] if result else None

def get_all_neo4j_movies():
    query = """
    MATCH (m:Movie)
    RETURN DISTINCT m.title AS title
    """
    return get_neo4j_conn.query(query)

