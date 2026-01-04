import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Search as SearchIcon, Film, ArrowRight, X } from 'lucide-react';
import { getAllMovies } from '../services/movieService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Search() {
  const [query, setQuery] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger tous les films au démarrage
  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllMovies();
      setAllMovies(data);
      setFilteredMovies(data); // Afficher tous les films au départ
    } catch (err) {
      setError(err.message);
      toast.error(`Erreur: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les films en temps réel
  useEffect(() => {
    if (!query.trim()) {
      setFilteredMovies(allMovies);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    
    const filtered = allMovies.filter((movie) => {
      // Recherche dans le titre
      const titleMatch = movie.title.toLowerCase().includes(searchTerm);
      
      // Recherche dans les acteurs
      const actorsMatch = Array.isArray(movie.actors) && 
        movie.actors.some(actor => actor.toLowerCase().includes(searchTerm));
      
      // Recherche dans la description
      const descriptionMatch = movie.description && 
        movie.description.toLowerCase().includes(searchTerm);
      
      return titleMatch || actorsMatch || descriptionMatch;
    });

    setFilteredMovies(filtered);
  }, [query, allMovies]);

  const handleClear = () => {
    setQuery('');
  };

  if (loading) return <LoadingSpinner message="Chargement des films..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAllMovies} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* En-tête */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <SearchIcon className="text-indigo-800" size={48} />
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800">
              Recherche de films
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Recherche instantanée par titre, acteur ou description
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <SearchIcon className="text-gray-400" size={24} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              placeholder="Commencez à taper (titre, acteur, description)..."
              autoFocus
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                title="Effacer"
              >
                <X size={24} />
              </button>
            )}
          </div>
          
          {/* Compteur de résultats */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              {query ? (
                <>
                  <span className="font-semibold text-indigo-700">{filteredMovies.length}</span> résultat(s) pour "{query}"
                </>
              ) : (
                <>
                  <span className="font-semibold text-indigo-700">{allMovies.length}</span> film(s) au total
                </>
              )}
            </p>
            {query && (
              <button
                onClick={handleClear}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Afficher tous les films
              </button>
            )}
          </div>
        </div>

        {/* Aucun résultat */}
        {query && filteredMovies.length === 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8 text-center">
            <Film className="mx-auto text-yellow-600 mb-4" size={64} />
            <p className="text-yellow-800 font-semibold text-lg mb-2">
              Aucun résultat pour "{query}"
            </p>
            <p className="text-yellow-700 mb-4">
              Essayez avec un autre terme de recherche
            </p>
            <button
              onClick={handleClear}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
            >
              Voir tous les films
            </button>
          </div>
        )}

        {/* Résultats */}
        {filteredMovies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-indigo-800 mb-3 line-clamp-1">
                  {movie.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {movie.year}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {Array.isArray(movie.actors) ? movie.actors.length : 0} acteur(s)
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-1">
                    <span className="font-semibold">Acteurs:</span>{' '}
                    {Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors}
                  </p>
                  {movie.description && (
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {movie.description}
                    </p>
                  )}
                </div>
                <Link
                  to={`/movie/${movie.title}`}
                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition w-full justify-center"
                >
                  Voir les détails
                  <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* État initial (pas de films) */}
        {!loading && allMovies.length === 0 && (
          <div className="text-center py-20">
            <Film className="mx-auto text-gray-400 mb-6" size={96} />
            <p className="text-gray-500 text-xl mb-2">
              Aucun film disponible
            </p>
            <p className="text-gray-400 text-sm">
              Ajoutez des films depuis la page d'accueil
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
