from flask import Blueprint, jsonify
from app.services.user_service import (
    get_users_who_rated_movie,
    get_user_details
)

users_bp = Blueprint("users", __name__)

@users_bp.route("/rated/<movie_name>", methods=["GET"])
def users_who_rated(movie_name):
    users = get_users_who_rated_movie(movie_name)
    return jsonify(users)

@users_bp.route("/<username>", methods=["GET"])
def user_details(username):
    user = get_user_details(username)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user)

