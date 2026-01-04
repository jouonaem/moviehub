import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ConfirmDialog from '../components/ConfirmDialog';
import { getMovieByTitle, updateMovie, deleteMovie } from '../services/movieService';

function MovieDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editForm, setEditForm] = useState({
    year: '',
    actors: '',
    description: ''
  });

  useEffect(() => {
    fetchMovie();
  }, [name]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMovieByTitle(name);
      setMovie(data);
      setEditForm({
        year: data.year || '',
        actors: Array.isArray(data.actors) ? data.actors.join(', ') : '',
        description: data.description || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading('Mise à jour en cours...');
    
    try {
      const updateData = {
        year: parseInt(editForm.year),
        actors: editForm.actors.split(',').map(actor => actor.trim()),
        description: editForm.description
      };
      await updateMovie(name, updateData);
      await fetchMovie();
      setIsEditing(false);
      toast.success(`Film "${movie.title}" mis à jour avec succès !`, { id: loadingToast });
    } catch (err) {
      toast.error(`Erreur: ${err.message}`, { id: loadingToast });
    }
  };

  const handleDelete = async () => {
    const loadingToast = toast.loading('Suppression en cours...');
    
    try {
      await deleteMovie(movie.title);
      toast.success(`Film "${movie.title}" supprimé avec succès !`, { id: loadingToast });
      setTimeout(() => navigate('/'), 500);
    } catch (err) {
      toast.error(`Erreur: ${err.message}`, { id: loadingToast });
    }
  };

  if (loading) return <LoadingSpinner message="Chargement du film..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchMovie} />;
  if (!movie) return <ErrorMessage message="Film non trouvé" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2 transition"
        >
          ← Retour à l'accueil
        </button>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {!isEditing ? (
            <>
              {/* En-tête du film */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
                      {movie.title}
                    </h1>
                    <div className="flex items-center gap-3">
                      <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-lg font-semibold">
                        {movie.year}
                      </span>
                      <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-lg font-semibold">
                        {Array.isArray(movie.actors) ? movie.actors.length : 0} acteur(s)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenu détaillé */}
              <div className="p-8">
                {/* Section Acteurs */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                    Distribution
                  </h2>
                  <div className="bg-indigo-50 rounded-lg p-6">
                    {Array.isArray(movie.actors) && movie.actors.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {movie.actors.map((actor, index) => (
                          <span
                            key={index}
                            className="bg-white text-indigo-700 px-4 py-2 rounded-full font-medium shadow-sm"
                          >
                            {actor}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Aucun acteur renseigné</p>
                    )}
                  </div>
                </div>

                {/* Section Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                    Synopsis
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    {movie.description ? (
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {movie.description}
                      </p>
                    ) : (
                      <p className="text-gray-500 italic">Aucune description disponible</p>
                    )}
                  </div>
                </div>

                {/* Section Informations techniques */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                    Informations
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">ID MongoDB</p>
                      <p className="font-mono text-sm text-gray-800">{movie.id}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Année de sortie</p>
                      <p className="text-2xl font-bold text-gray-800">{movie.year}</p>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-yellow-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-yellow-600 transition shadow-lg"
                  >
                    Modifier ce film
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex-1 bg-red-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-600 transition shadow-lg"
                  >
                    Supprimer ce film
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Mode édition */}
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white">
                <h2 className="text-3xl font-bold">
                  Modifier "{movie.title}"
                </h2>
              </div>
              
              <div className="p-8">
                <form onSubmit={handleUpdate}>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2 text-lg">
                      Année de sortie *
                    </label>
                    <input
                      type="number"
                      required
                      min="1800"
                      max="2100"
                      value={editForm.year}
                      onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2 text-lg">
                      Acteurs * (séparés par des virgules)
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.actors}
                      onChange={(e) => setEditForm({ ...editForm, actors: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                      placeholder="Ex: Leonardo DiCaprio, Marion Cotillard"
                    />
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-gray-700 font-bold mb-2 text-lg">
                      Description
                    </label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                      rows="6"
                      placeholder="Décrivez le film..."
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition shadow-lg"
                    >
                      Enregistrer les modifications
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-gray-600 transition shadow-lg"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Dialogue de confirmation de suppression */}
        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
          title="Supprimer le film"
          message={`Êtes-vous sûr de vouloir supprimer "${movie?.title}" ? Cette action est irréversible.`}
        />
      </div>
    </div>
  );
}

export default MovieDetail;
