import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Composant d'affichage d'erreur réutilisable
 */
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertTriangle className="text-red-600 mr-3" size={32} />
          <h2 className="text-xl font-bold text-red-800">Erreur</h2>
        </div>
        <p className="text-red-700 mb-4">{message}</p>
        <p className="text-sm text-red-600 mb-4">
          Assurez-vous que le backend est démarré sur http://127.0.0.1:5000
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
