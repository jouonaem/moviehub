from app.config.mongo import get_movie_collection
from app.models.movie import movie_helper
from bson.objectid import ObjectId
import re

movie_collection = get_movie_collection()

def get_all_movies():
    movies = []
    for movie in movie_collection.find():
        movies.append(movie_helper(movie))
    return movies

def get_movie_by_title(title: str):
    regex = re.compile(f"^{re.escape(title)}$", re.IGNORECASE)
    movie = movie_collection.find_one({"title": regex})
    if movie:
        return movie_helper(movie)
    return None

def get_movie_by_actor(actor_name: str):
    regex = re.compile(actor_name, re.IGNORECASE)
    movies_cursor = movie_collection.find({"actors": regex})
    movies = [movie_helper(movie) for movie in movies_cursor]
    return movies

def update_movie(title: str, data_to_update: dict):
    if 'id' in data_to_update:
        del data_to_update['id']

    result = movie_collection.update_one(
        {"title": title},
        {"$set": data_to_update}
    )

    if result.matched_count > 0:
        return get_movie_by_title(title)
    return None

def get_all_movie_titles():
    titles = []
    for movie in movie_collection.find({}, {"title": 1, "_id": 0}):
        titles.append(movie['title'])
    return titles

    
