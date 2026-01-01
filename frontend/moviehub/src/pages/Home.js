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

// Donnée fictive pour le nombre de films communs
const commonMoviesCount = 2;

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Accueil - Liste des films</h1>
      {/* Carte stylisée pour le nombre de films communs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg rounded-xl p-8 flex flex-col items-center w-full max-w-md border-4 border-white">
          <div className="flex items-center mb-2">
            <svg className="w-8 h-8 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 5.87V4m0 0a4 4 0 11-8 0 4 4 0 018 0zm8 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h2 className="text-xl font-bold text-white">Films communs MongoDB &amp; Neo4j</h2>
          </div>
          <div className="text-5xl font-extrabold text-white drop-shadow mb-2">{commonMoviesCount}</div>
          <p className="text-white text-opacity-80">Nombre de films présents dans les deux bases de données</p>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Nom</th>
            <th className="py-2 px-4 border-b">Année</th>
            <th className="py-2 px-4 border-b">Réalisateur</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.name} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{movie.name}</td>
              <td className="py-2 px-4 border-b">{movie.year}</td>
              <td className="py-2 px-4 border-b">{movie.director}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <Link to={`/movie/${movie.name}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Détail</Link>
                <Link to={`/movie/${movie.name}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Modifier</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Utilisateurs</h2>
        <ul className="flex space-x-4">
          {users.map((user) => (
            <li key={user.username}>
              <Link to={`/user/${user.username}`} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Voir {user.username}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
