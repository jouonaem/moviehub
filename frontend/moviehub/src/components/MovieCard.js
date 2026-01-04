import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';

/**
 * Composant réutilisable pour afficher une carte de film (vue résumée)
 */
function MovieCard({ movie, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(movie.title);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1">
        {/* En-tête avec titre et année */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-indigo-800 mb-2">{movie.title}</h3>
          <div className="flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
              {movie.year}
            </span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              {Array.isArray(movie.actors) ? movie.actors.length : 0} acteur(s)
            </span>
          </div>
        </div>

        {/* Description tronquée (si disponible) */}
        {movie.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
            {movie.description}
          </p>
        )}

        {/* Boutons d'action */}
        <div className="flex gap-2 mt-4">
          <Link
            to={`/movie/${movie.title}`}
            className="flex-1 bg-blue-500 text-white text-center px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Voir détails
          </Link>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
            title="Supprimer le film"
          >
            Supprimer
          </button>
        </div>
      </div>

      {/* Dialogue de confirmation */}
      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Supprimer le film"
        message={`Êtes-vous sûr de vouloir supprimer "${movie.title}" ? Cette action est irréversible.`}
      />
    </>
  );
}

export default MovieCard;
