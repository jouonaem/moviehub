from flask import Blueprint, jsonify
from app.services.user_service import get_all_neo4j_movies

stats_bp = Blueprint("stats", __name__)

@stats_bp.route("/neo4j/movies", methods=["GET"])
def neo4j_movies():
    movies = get_all_neo4j_movies()
    return jsonify(movies)
