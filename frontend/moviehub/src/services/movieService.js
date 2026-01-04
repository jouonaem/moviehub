/**
 * Service pour gérer les appels API liés aux films
 */
import { API_ENDPOINTS } from '../config/api';

/**
 * Récupère tous les films
 */
export const getAllMovies = async () => {
  const response = await fetch(API_ENDPOINTS.MOVIES);
  if (!response.ok) throw new Error('Erreur lors du chargement des films');
  return response.json();
};

/**
 * Récupère un film par son titre
 */
export const getMovieByTitle = async (title) => {
  const response = await fetch(API_ENDPOINTS.MOVIE_BY_ID(title));
  if (!response.ok) throw new Error('Film non trouvé');
  return response.json();
};

/**
 * Recherche des films par titre ou acteur
 */
export const searchMovies = async (query) => {
  const response = await fetch(`${API_ENDPOINTS.MOVIE_SEARCH}?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Erreur lors de la recherche');
  return response.json();
};

/**
 * Crée un nouveau film
 */
export const createMovie = async (movieData) => {
  const response = await fetch(API_ENDPOINTS.MOVIES, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movieData)
  });
  if (!response.ok) throw new Error('Erreur lors de la création du film');
  return response.json();
};

/**
 * Met à jour un film
 */
export const updateMovie = async (title, movieData) => {
  const response = await fetch(API_ENDPOINTS.MOVIE_BY_ID(title), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movieData)
  });
  if (!response.ok) throw new Error('Erreur lors de la mise à jour du film');
  return response.json();
};

/**
 * Supprime un film
 */
export const deleteMovie = async (title) => {
  const response = await fetch(API_ENDPOINTS.MOVIE_BY_ID(title), {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Erreur lors de la suppression du film');
  return response.json();
};
