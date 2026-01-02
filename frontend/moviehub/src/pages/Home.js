import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialMovies = [
  { title: 'Inception', year: 2010, actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'], description: "Un voleur qui s'infiltre dans les rêves pour voler des secrets." },
  { title: 'Interstellar', year: 2014, actors: ['Matthew McConaughey', 'Anne Hathaway'], description: "Une équipe d'explorateurs voyage à travers un trou de ver dans l'espace." },
  { title: 'The Matrix', year: 1999, actors: ['Keanu Reeves', 'Laurence Fishburne'], description: "Un hacker découvre la vraie nature de sa réalité." },
];

const users = [
  { username: 'johndoe' },
  { username: 'janedoe' },
];

const commonMoviesCount = 2;

function Home() {
  const [movies, setMovies] = useState(initialMovies);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    year: '',
    actors: '',
    description: ''
  });

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (newMovie.title && newMovie.year && newMovie.actors) {
      const movieToAdd = {
        title: newMovie.title,
        year: parseInt(newMovie.year),
        actors: newMovie.actors.split(',').map(actor => actor.trim()),
        description: newMovie.description
      };
      setMovies([...movies, movieToAdd]);
      setNewMovie({ title: '', year: '', actors: '', description: '' });
      setShowAddModal(false);
    }
  };

  const handleDeleteMovie = (movieTitle) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le film "${movieTitle}" ?`)) {
      setMovies(movies.filter(movie => movie.title !== movieTitle));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-10 text-center tracking-tight">Accueil – Liste des films</h1>
        {/* Carte stylisée pour le nombre de films communs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/80 backdrop-blur border border-indigo-100 shadow rounded-xl px-8 py-6 flex flex-col items-center w-full max-w-md transition hover:shadow-lg">
            <div className="flex items-center mb-2">
              <span className="inline-block text-3xl mr-2">🎬</span>
              <h2 className="text-lg font-semibold text-indigo-700">Films communs MongoDB &amp; Neo4j</h2>
            </div>
            <div className="text-4xl font-extrabold text-indigo-700 mb-1">{commonMoviesCount}</div>
            <p className="text-gray-600 text-sm">Nombre de films présents dans les deux bases de données</p>
          </div>
        </div>
        {/* Tableau des films */}
        <div className="bg-white/90 rounded-xl shadow p-6 mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-indigo-700">Films disponibles</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-500/90 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-green-600 transition"
            >
              + Ajouter un film
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="py-2 px-4 text-left font-semibold text-indigo-700">Titre</th>
                  <th className="py-2 px-4 text-left font-semibold text-indigo-700">Année</th>
                  <th className="py-2 px-4 text-left font-semibold text-indigo-700">Acteurs</th>
                  <th className="py-2 px-4 text-left font-semibold text-indigo-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {movies.map((movie) => (
                  <tr key={movie.title} className="hover:bg-indigo-50 transition">
                    <td className="py-2 px-4 font-medium text-gray-800">{movie.title}</td>
                    <td className="py-2 px-4 text-gray-600">{movie.year}</td>
                    <td className="py-2 px-4 text-gray-600">{Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors}</td>
                    <td className="py-2 px-4 space-x-2">
                      <Link to={`/movie/${movie.title}`} className="inline-block bg-blue-500/90 text-white px-3 py-1 rounded-lg font-medium shadow-sm hover:bg-blue-600 transition">Détail</Link>
                      <Link to={`/movie/${movie.title}/edit`} className="inline-block bg-yellow-500/90 text-white px-3 py-1 rounded-lg font-medium shadow-sm hover:bg-yellow-600 transition">Modifier</Link>
                      <button
                        onClick={() => handleDeleteMovie(movie.title)}
                        className="inline-block bg-red-500/90 text-white px-3 py-1 rounded-lg font-medium shadow-sm hover:bg-red-600 transition"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal d'ajout de film */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-indigo-800 mb-6">Ajouter un film</h3>
              <form onSubmit={handleAddMovie}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Titre *</label>
                  <input
                    type="text"
                    required
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ex: Inception"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Année *</label>
                  <input
                    type="number"
                    required
                    value={newMovie.year}
                    onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ex: 2010"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Acteurs * (séparés par des virgules)</label>
                  <input
                    type="text"
                    required
                    value={newMovie.actors}
                    onChange={(e) => setNewMovie({ ...newMovie, actors: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ex: Leonardo DiCaprio, Joseph Gordon-Levitt"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    placeholder="Description du film..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setNewMovie({ title: '', year: '', actors: '', description: '' });
                    }}
                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Utilisateurs */}
        <div className="bg-white/90 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">Utilisateurs</h2>
          <ul className="flex flex-wrap gap-4">
            {users.map((user) => (
              <li key={user.username}>
                <Link to={`/user/${user.username}`} className="bg-green-500/90 text-white px-5 py-2 rounded-lg font-medium shadow-sm hover:bg-green-600 transition">
                  Voir {user.username}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
