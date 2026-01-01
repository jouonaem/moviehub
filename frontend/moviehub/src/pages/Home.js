import React from 'react';
import { Link } from 'react-router-dom';

const movies = [
  { name: 'Inception', year: 2010, director: 'Christopher Nolan' },
  { name: 'Interstellar', year: 2014, director: 'Christopher Nolan' },
  { name: 'The Matrix', year: 1999, director: 'Lana Wachowski, Lilly Wachowski' },
];

const users = [
  { username: 'johndoe' },
  { username: 'janedoe' },
];

const commonMoviesCount = 2;

function Home() {
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
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">Films disponibles</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="py-2 px-4 text-left font-semibold text-indigo-700">Nom</th>
                  <th className="py-2 px-4 text-left font-semibold text-indigo-700">Année</th>
                  <th className="py-2 px-4 text-left font-semibold text-indigo-700">Réalisateur</th>
                  <th className="py-2 px-4 text-left font-semibold text-indigo-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {movies.map((movie) => (
                  <tr key={movie.name} className="hover:bg-indigo-50 transition">
                    <td className="py-2 px-4 font-medium text-gray-800">{movie.name}</td>
                    <td className="py-2 px-4 text-gray-600">{movie.year}</td>
                    <td className="py-2 px-4 text-gray-600">{movie.director}</td>
                    <td className="py-2 px-4 space-x-2">
                      <Link to={`/movie/${movie.name}`} className="inline-block bg-blue-500/90 text-white px-3 py-1 rounded-lg font-medium shadow-sm hover:bg-blue-600 transition">Détail</Link>
                      <Link to={`/movie/${movie.name}/edit`} className="inline-block bg-yellow-500/90 text-white px-3 py-1 rounded-lg font-medium shadow-sm hover:bg-yellow-600 transition">Modifier</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
