import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, BarChart3, Star, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getUserDetails } from '../services/userService';

/**
 * Page de détails d'un utilisateur
 * 
 * ⚠️ UTILISE DES DONNÉES FICTIVES
 * Cette page sera fonctionnelle une fois le backend Neo4j implémenté.
 * Voir: src/services/userService.js pour les appels API à implémenter.
 */
function UserDetail() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [username]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserDetails(username);
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Chargement de l'utilisateur..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchUser} />;
  if (!user) return <ErrorMessage message="Utilisateur non trouvé" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Retour à l'accueil
        </button>

        {/* Bannière d'avertissement */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="text-yellow-600" size={24} />
          <p className="text-yellow-800 text-sm">
            <strong>Données fictives</strong> - Cette page utilisera de vraies données une fois le backend Neo4j implémenté.
          </p>
        </div>

        {/* Carte utilisateur */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center">
              <User className="text-indigo-700" size={40} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-indigo-800">{user.username}</h1>
              <p className="text-gray-600">Utilisateur MovieHub</p>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-indigo-50 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-indigo-700" size={40} />
              <div>
                <p className="text-3xl font-bold text-indigo-700">
                  {user.ratedMoviesCount}
                </p>
                <p className="text-gray-600">Films notés</p>
              </div>
            </div>
          </div>

          {/* Liste des films notés */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              Films notés par {user.username}
            </h2>
            {user.ratedMovies && user.ratedMovies.length > 0 ? (
              <div className="space-y-3">
                {user.ratedMovies.map((movie, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition"
                  >
                    <div className="flex-1">
                      <Link
                        to={`/movie/${movie.title}`}
                        className="text-lg font-semibold text-indigo-700 hover:text-indigo-900"
                      >
                        {movie.title}
                      </Link>
                      <p className="text-gray-600 text-sm">Année: {movie.year}</p>
                    </div>
                    {movie.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={20} />
                        <span className="text-lg font-bold text-gray-700">
                          {movie.rating}/5
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Aucun film noté pour le moment
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
