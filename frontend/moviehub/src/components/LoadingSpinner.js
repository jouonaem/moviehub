import React from 'react';

/**
 * Composant de chargement réutilisable
 */
function LoadingSpinner({ message = 'Chargement...' }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-700 mx-auto mb-4"></div>
        <p className="text-indigo-700 font-semibold text-lg">{message}</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
