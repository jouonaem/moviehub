class User:
    def __init__(self, name, movies=None):
        self.name = name
        self.movies = movies or []
