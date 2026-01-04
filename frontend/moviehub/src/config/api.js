// Configuration de l'API backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

export const API_ENDPOINTS = {
  // Movies endpoints
  MOVIES: `${API_BASE_URL}/movies/`,
  MOVIE_SEARCH: `${API_BASE_URL}/movies/search`,
  MOVIE_BY_ID: (id) => `${API_BASE_URL}/movies/${id}`,
  MOVIE_TITLES: `${API_BASE_URL}/movies/titles`,
  
  // Users endpoints (Neo4j - à implémenter)
  USERS: `${API_BASE_URL}/users/`,
  USER_BY_NAME: (username) => `${API_BASE_URL}/users/${username}`,
  
  // Stats endpoints (Mixed - à implémenter)
  COMMON_MOVIES: `${API_BASE_URL}/stats/common-movies`,
};

export default API_BASE_URL;
