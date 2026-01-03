import React from 'react';

const user = {
  username: 'johndoe',
  ratedMovies: [
    { name: 'Inception', year: 2010 },
    { name: 'Interstellar', year: 2014 },
  ],
};

function UserDetail() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Détail de l'utilisateur</h1>
      <p className="text-gray-600">Cette page affichera les informations d'un utilisateur et la liste des films notés.</p>
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h2 className="text-2xl font-bold mb-2">Utilisateur : {user.username}</h2>
        <p className="text-gray-700 mb-2">Nombre de films notés : {user.ratedMovies.length}</p>
        <h3 className="text-lg font-semibold mb-2">Films notés :</h3>
        <ul className="list-disc pl-6">
          {user.ratedMovies.map((movie) => (
            <li key={movie.name} className="mb-1">{movie.name} ({movie.year})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDetail;
