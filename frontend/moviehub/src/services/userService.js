/**
 * Service pour gérer les appels API liés aux utilisateurs (Neo4j)
 * 
 * ⚠️ À IMPLÉMENTER PAR L'ÉQUIPE NEO4J
 * Ces fonctions utilisent actuellement des données fictives.
 * Remplacez-les par de vrais appels API une fois le backend Neo4j prêt.
 */
import { API_ENDPOINTS } from '../config/api';

/**
 * Récupère les utilisateurs qui ont noté un film
 * @param {string} movieTitle - Titre du film
 * @returns {Promise<Array>} Liste des utilisateurs
 * 
 * TODO Neo4j: Implémenter l'appel API
 * Endpoint attendu: GET /users/ratings?movie={movieTitle}
 */
export const getUsersWhoRatedMovie = async (movieTitle) => {
  // TODO: Décommenter quand le backend Neo4j sera prêt
  /*
  const response = await fetch(`${API_ENDPOINTS.USERS}ratings?movie=${encodeURIComponent(movieTitle)}`);
  if (!response.ok) throw new Error('Erreur lors du chargement des utilisateurs');
  return response.json();
  */
  
  // Données fictives temporaires
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { username: 'johndoe', rating: 5 },
        { username: 'janedoe', rating: 4 },
        { username: 'bobsmith', rating: 5 }
      ]);
    }, 500);
  });
};

/**
 * Récupère les détails d'un utilisateur avec ses films notés
 * @param {string} username - Nom d'utilisateur
 * @returns {Promise<Object>} Détails de l'utilisateur
 * 
 * TODO Neo4j: Implémenter l'appel API
 * Endpoint attendu: GET /users/{username}
 */
export const getUserDetails = async (username) => {
  // TODO: Décommenter quand le backend Neo4j sera prêt
  /*
  const response = await fetch(API_ENDPOINTS.USER_BY_NAME(username));
  if (!response.ok) throw new Error('Utilisateur non trouvé');
  return response.json();
  */
  
  // Données fictives temporaires
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: username,
        ratedMoviesCount: 3,
        ratedMovies: [
          { title: 'Inception', rating: 5, year: 2010 },
          { title: 'Interstellar', rating: 4, year: 2014 },
          { title: 'The Matrix', rating: 5, year: 1999 }
        ]
      });
    }, 500);
  });
};

/**
 * Récupère tous les utilisateurs
 * @returns {Promise<Array>} Liste des utilisateurs
 * 
 * TODO Neo4j: Implémenter l'appel API
 * Endpoint attendu: GET /users/
 */
export const getAllUsers = async () => {
  // TODO: Décommenter quand le backend Neo4j sera prêt
  /*
  const response = await fetch(API_ENDPOINTS.USERS);
  if (!response.ok) throw new Error('Erreur lors du chargement des utilisateurs');
  return response.json();
  */
  
  // Données fictives temporaires
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { username: 'johndoe' },
        { username: 'janedoe' },
        { username: 'bobsmith' }
      ]);
    }, 500);
  });
};
