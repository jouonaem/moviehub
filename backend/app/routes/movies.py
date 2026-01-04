from flask import Blueprint, jsonify, request
from app.services import movie_service

movies_bp = Blueprint('movies', __name__, url_prefix='/movies')

@movies_bp.route('/', methods=['GET', 'POST'])
def handle_movies():
    if request.method == 'POST':
        data = request.get_json()
        if not data or 'title' not in data:
            return jsonify({"error": "Données manquantes"}), 400
        new_movie = movie_service.create_movie(data)
        return jsonify(new_movie), 201
    
    # Defaults to GET logic
    all_movies = movie_service.get_all_movies()
    return jsonify(all_movies)

@movies_bp.route('/search', methods=['GET'])
def search_movies():
    query = request.args.get('query')
    title = request.args.get('title')
    actor = request.args.get('actor')

    if query:
        # Priority: Exact/Regex Title Match -> Actor Match
        movies = movie_service.get_movie_by_title(query)
        if movies:
            return jsonify(movies)
        
        movies = movie_service.get_movie_by_actor(query)
        if movies:
            return jsonify(movies)
        
        return jsonify({"error": "Aucun résultat pour cette recherche"}), 404

    if title:
        movies = movie_service.get_movie_by_title(title)
        if movies:
            return jsonify(movies)
        return jsonify({"error": "Film introuvable"}), 404

    if actor:
        movies = movie_service.get_movie_by_actor(actor)
        return jsonify(movies)
    return jsonify({"error": "Indiquer un 'query', 'title' ou 'actor'"}), 400

@movies_bp.route('/<string:identifier>', methods=['GET', 'PUT', 'DELETE'])
def handle_movie_by_identifier(identifier):
    if request.method == 'GET':
        # 1. Try by ID
        movie = movie_service.get_movie_by_id(identifier)
        if movie:
            return jsonify(movie)
        
        # 2. Fallback: Try by Title (Requirement says name is given)
        movies_by_title = movie_service.get_movie_by_title(identifier)
        if movies_by_title:
            # If multiple found, return the precise match or the first one. 
            # Since get_movie_by_title uses strict regex ^...$, it essentially finds exact matches.
            return jsonify(movies_by_title[0])
            
        return jsonify({"error": "Film introuvable (ni par ID, ni par Titre)"}), 404

    if request.method == 'DELETE':
        # Requirement: "name of the movie is given in parameter"
        # We try to delete by title. 
        # (Could be improved to try ID too, but let's stick to current logic/impl which uses title)
        success = movie_service.delete_movie(identifier)
        if success:
            return jsonify({"message": "Film supprimé avec succès"}), 200
        return jsonify({"error": "Film introuvable"}), 404

    # Defaults to PUT logic
    data = request.get_json()
    if not data:
        return jsonify({"error": "Données manquantes pour la mise à jour"}), 400

    # Requirement: "update information ... name of the movie is given in parameter"
    # Logic in service uses 'title' to find and update.
    updated_movie = movie_service.update_movie(identifier, data)
    if updated_movie:
        # If updated_movie returns a list (from get_movie_by_title inside it), normalize result
        if isinstance(updated_movie, list) and len(updated_movie) > 0:
             return jsonify(updated_movie[0])
        return jsonify(updated_movie)
        
    return jsonify({"error": "Film non trouvé ou erreur de mise à jour"}), 404

@movies_bp.route('/titles', methods=['GET'])
def get_movie_titles():
    titles = movie_service.get_all_movie_titles()
    return jsonify(titles)

    