import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function MovieDetail() {
  const navigate = useNavigate();
  const { name } = useParams();

  // Données fictives
  const movie = {
    name: name,
    year: 2010,
    director: 'Christopher Nolan',
    actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
    description: "Un voleur qui s'infiltre dans les rêves pour voler des secrets."
  };

  // Utilisateurs fictifs ayant noté le film
  const usersRated = [
    { username: 'johndoe' },
    { username: 'janedoe' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h2 className="text-2xl font-bold mb-2">{movie.name}</h2>
        <p className="text-gray-700 mb-1">Année : {movie.year}</p>
        <p className="text-gray-700 mb-1">Réalisateur : {movie.director}</p>
        <p className="text-gray-700 mb-1">Acteurs : {movie.actors.join(', ')}</p>
        <p className="text-gray-700 mb-2">Description : {movie.description}</p>
        <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Retour</button>
      </div>
      {/* Section utilisateurs ayant noté le film */}
      <div className="bg-gray-100 rounded-lg shadow p-6 mb-4">
        <h3 className="text-lg font-semibold mb-2">Utilisateurs ayant noté ce film :</h3>
        <ul className="flex space-x-4">
          {usersRated.map((user) => (
            <li key={user.username}>
              <a href={`/user/${user.username}`} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                {user.username}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieDetail;
