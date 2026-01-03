import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Film, Link2, Plus, AlertTriangle, User } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getAllMovies, createMovie, deleteMovie } from '../services/movieService';
import { getAllUsers } from '../services/userService';
import { getCommonMoviesStats } from '../services/statsService';

function Home() {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [commonStats, setCommonStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    year: '',
    actors: '',
    description: ''
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Charger les films (MongoDB - réel)
      const moviesData = await getAllMovies();
      setMovies(moviesData);
      
      // Charger les utilisateurs (Neo4j - fictif pour l'instant)
      const usersData = await getAllUsers();
      setUsers(usersData);
      
      // Charger les stats communes (MongoDB + Neo4j - fictif pour l'instant)
      const statsData = await getCommonMoviesStats();
      setCommonStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const data = await getAllMovies();
      setMovies(data);
    } catch (err) {
      console.error('Erreur lors du rechargement des films:', err);
    }
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    
    if (!newMovie.title || !newMovie.year || !newMovie.actors) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const loadingToast = toast.loading('Ajout du film en cours...');

    try {
      const movieData = {
        title: newMovie.title,
        year: parseInt(newMovie.year),
        actors: newMovie.actors.split(',').map(actor => actor.trim()),
        description: newMovie.description
      };
      
      await createMovie(movieData);
      await fetchMovies();
      setNewMovie({ title: '', year: '', actors: '', description: '' });
      setShowAddModal(false);
      toast.success(`Film "${movieData.title}" ajouté avec succès !`, { id: loadingToast });
    } catch (err) {
      toast.error(`Erreur: ${err.message}`, { id: loadingToast });
    }
  };

  const handleDeleteMovie = async (title) => {
    const loadingToast = toast.loading('Suppression en cours...');
    
    try {
      await deleteMovie(title);
      await fetchMovies();
      toast.success(`Film "${title}" supprimé avec succès !`, { id: loadingToast });
    } catch (err) {
      toast.error(`Erreur: ${err.message}`, { id: loadingToast });
    }
  };

  if (loading) return <LoadingSpinner message="Chargement..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAllData} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* En-tête */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Film className="text-indigo-800" size={48} />
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800">
              MovieHub
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Explorez notre collection de films et utilisateurs
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
          {/* Films MongoDB */}
          <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <Film className="text-indigo-700" size={40} />
              <div>
                <p className="text-3xl font-bold text-indigo-700">{movies.length}</p>
                <p className="text-gray-600">Films (MongoDB)</p>
              </div>
            </div>
          </div>

          {/* Films communs MongoDB + Neo4j */}
          <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <Link2 className="text-green-700" size={40} />
              <div>
                <p className="text-3xl font-bold text-green-700">
                  {commonStats ? commonStats.count : '...'}
                </p>
                <p className="text-gray-600">Films communs</p>
                <div className="flex items-center gap-1 mt-1">
                  <AlertTriangle className="text-yellow-600" size={12} />
                  <p className="text-xs text-yellow-600">Données fictives</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Films */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Film className="text-indigo-800" size={32} />
              <h2 className="text-3xl font-bold text-indigo-800">Films</h2>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-600 transition transform hover:scale-105 flex items-center gap-2"
            >
              <Plus size={20} />
              Ajouter un film
            </button>
          </div>

          {movies.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow">
              <Film className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-500 text-xl mb-4">Aucun film disponible</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Ajoutez le premier film
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onDelete={handleDeleteMovie}
                />
              ))}
            </div>
          )}
        </div>

        {/* Section Utilisateurs (Neo4j) */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <User className="text-indigo-800" size={32} />
              <h2 className="text-3xl font-bold text-indigo-800">Utilisateurs</h2>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
              <AlertTriangle size={14} />
              Données fictives
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Liste des utilisateurs qui ont noté des films (Neo4j)
          </p>
          {users.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {users.map((user) => (
                <Link
                  key={user.username}
                  to={`/user/${user.username}`}
                  className="bg-indigo-500 text-white px-5 py-3 rounded-lg font-medium shadow hover:bg-indigo-600 transition transform hover:scale-105 flex items-center gap-2"
                >
                  <User size={18} />
                  {user.username}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Aucun utilisateur disponible
            </p>
          )}
        </div>

        {/* Modal d'ajout */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-indigo-800 mb-6">
                Ajouter un film
              </h3>
              <form onSubmit={handleAddMovie}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Titre *
                  </label>
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
                  <label className="block text-gray-700 font-semibold mb-2">
                    Année *
                  </label>
                  <input
                    type="number"
                    required
                    min="1800"
                    max="2100"
                    value={newMovie.year}
                    onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ex: 2010"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Acteurs * (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    required
                    value={newMovie.actors}
                    onChange={(e) => setNewMovie({ ...newMovie, actors: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ex: Leonardo DiCaprio, Marion Cotillard"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    placeholder="Description du film..."
                  />
                </div>
                <div className="flex gap-3">
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
      </div>
    </div>
  );
}

export default Home;
