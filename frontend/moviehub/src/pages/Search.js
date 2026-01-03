import React, { useState } from 'react';

const fakeMovies = [
  { title: 'Inception', year: 2010, actors: ['Leonardo DiCaprio'], description: "Un voleur qui s'infiltre dans les rêves pour voler des secrets." },
  { title: 'Interstellar', year: 2014, actors: ['Matthew McConaughey'], description: "Une équipe d'explorateurs voyage à travers un trou de ver dans l'espace." },
  { title: 'The Matrix', year: 1999, actors: ['Keanu Reeves'], description: "Un hacker découvre la vraie nature de sa réalité." },
];

function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      const filtered = fakeMovies.filter(
        (movie) =>
          movie.title.toLowerCase().startsWith(value.toLowerCase()) ||
          movie.actors.some((actor) => actor.toLowerCase().startsWith(value.toLowerCase()))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // La recherche se fait déjà à chaque frappe
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-10 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto">
        {/* Message d'accueil en haut de la page */}
        {!search && results.length === 0 && (
          <div className="mb-8 text-center">
            <p className="text-indigo-700 text-lg font-medium mb-1">Bienvenue sur la page de recherche !</p>
            <p className="text-gray-600">Saisissez le nom d'un film ou d'un acteur pour lancer une recherche dans la base de données.</p>
          </div>
        )}
        <div className="bg-white/90 rounded-xl shadow p-8 mb-8 border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-4 text-center tracking-tight">Recherche de films</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="block font-medium text-indigo-700">Nom du film ou de l'acteur</label>
            <input
              type="text"
              value={search}
              onChange={handleChange}
              className="w-full border border-indigo-100 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-300 text-gray-800 bg-gray-50"
              placeholder="Saisir le nom..."
            />
            <button type="submit" className="bg-indigo-500 text-white px-5 py-2 rounded font-medium shadow-sm hover:bg-indigo-600 transition self-end">Rechercher</button>
          </form>
        </div>
        {results.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((movie) => (
              <div key={movie.title} className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex flex-col gap-1 hover:shadow-md transition">
                <span className="font-semibold text-indigo-700 text-lg">{movie.title}</span>
                <span className="text-gray-500 text-sm">Année : {movie.year}</span>
                <span className="text-gray-600 text-sm">Acteurs : {movie.actors.join(', ')}</span>
              </div>
            ))}
          </div>
        )}
        {results.length === 0 && search && (
          <div className="text-center text-gray-500 mt-4">Aucun résultat trouvé.</div>
        )}
      </div>
    </div>
  );
}

export default Search;
