def movie_helper(movie) -> dict:
    return {
        "id": str(movie["_id"]),
        "title": movie["title"],
        "actors": movie.get("actors", []),
        "year": movie.get("year")
    }