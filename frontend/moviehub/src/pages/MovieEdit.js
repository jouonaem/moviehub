import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MovieEdit() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: name,
    year: '',
    actors: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'édition fictive
    navigate(`/movie/${name}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Modifier le film : {name}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Titre</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Année</label>
          <input type="text" name="year" value={form.year} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Acteurs (séparés par des virgules)</label>
          <input type="text" name="actors" value={form.actors} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Ex: Leonardo DiCaprio, Joseph Gordon-Levitt" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Enregistrer</button>
      </form>
    </div>
  );
}

export default MovieEdit;
