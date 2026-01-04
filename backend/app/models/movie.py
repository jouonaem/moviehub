def movie_helper(movie) -> dict:
    return {
        "id": str(movie["_id"]),
        "title": movie["title"],
        "actors": movie.get("actors", []),
        "description": movie.get("description"),
        "year": movie.get("year")
    }