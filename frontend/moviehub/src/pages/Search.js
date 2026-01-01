import React, { useState } from 'react';

const fakeMovies = [
  { name: 'Inception', year: 2010, actors: ['Leonardo DiCaprio'] },
  { name: 'Interstellar', year: 2014, actors: ['Matthew McConaughey'] },
  { name: 'The Matrix', year: 1999, actors: ['Keanu Reeves'] },
];

function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => setSearch(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Recherche fictive par nom de film ou d'acteur
    const filtered = fakeMovies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(search.toLowerCase()) ||
        movie.actors.some((actor) => actor.toLowerCase().includes(search.toLowerCase()))
    );
    setResults(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Recherche</h1>
      <p className="text-gray-600">Cette page permettra de rechercher un film par nom ou par acteur.</p>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-md mx-auto mb-6">
        <label className="block mb-2 font-medium">Nom du film ou de l'acteur</label>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Saisir le nom..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Rechercher</button>
      </form>
      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Résultats :</h2>
          <ul className="list-disc pl-6">
            {results.map((movie) => (
              <li key={movie.name} className="mb-1">
                {movie.name} ({movie.year}) - Acteurs : {movie.actors.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
      {results.length === 0 && search && (
        <div className="text-center text-gray-500 mt-4">Aucun résultat trouvé.</div>
      )}
    </div>
  );
}

export default Search;
