"""
Service pour les opérations communes entre MongoDB et Neo4j
"""
from app.services.movie_service import get_all_movie_titles


def get_mongodb_movie_titles():
    """
    Retourne la liste des titres de films depuis MongoDB
    Utilisé pour le croisement avec Neo4j
    """
    return get_all_movie_titles()


def count_common_movies(neo4j_titles: list) -> dict:
    """
    Compare les films MongoDB avec ceux de Neo4j
    
    Args:
        neo4j_titles: Liste des titres de films depuis Neo4j
        
    Returns:
        dict avec le nombre de films communs et leurs titres
    """
    mongo_titles = get_all_movie_titles()
    
    # Normalisation pour comparaison (case-insensitive)
    mongo_set = {title.lower() for title in mongo_titles}
    neo4j_set = {title.lower() for title in neo4j_titles}
    
    common_titles = mongo_set.intersection(neo4j_set)
    
    return {
        "count": len(common_titles),
        "common_movies": sorted(list(common_titles)),
        "mongodb_total": len(mongo_titles),
        "neo4j_total": len(neo4j_titles)
    }
