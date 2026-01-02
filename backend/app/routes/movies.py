from flask import Blueprint, jsonify, request
from app.services import movie_service

movies_bp = Blueprint('movies', __name__, url_prefix='/movies')

@movies_bp.route('/', methods=['GET'])
def get_movies():
    all_movies = movie_service.get_all_movies()
    return jsonify(all_movies)

@movies_bp.route('/search', methods=['GET'])
def search_movies():
    title = request.args.get('title')
    actor = request.args.get('actor')

    if title:
        movie = movie_service.get_movie_by_title(title)
        if movie:
            return jsonify(movie)
        return jsonify({"error": "Film introuvable"}), 404

    if actor:
        movies = movie_service.get_movie_by_actor(actor)
        return jsonify(movies)
    return jsonify({"error": "Indiquer un 'titre' ou 'acteur'"}), 400

@movies_bp.route('/<string:title>', methods=['PUT'])
def update_movie(title):
    data = request.get_json()
    if not data:
        return jsonify({"error": "Données manquantes pour la mise à jour"}), 400

    updated_movie = movie_service.update_movie(title, data)
    if updated_movie:
        return jsonify(updated_movie)
    return jsonify({"error": "Film non trouvé ou erreur de mise à jour"}), 404

@movies_bp.route('/titles', methods=['GET'])
def get_movie_titles():
    titles = movie_service.get_all_movie_titles()
    return jsonify(titles)

    