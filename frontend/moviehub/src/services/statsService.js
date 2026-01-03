/**
 * Service pour gérer les statistiques (MongoDB + Neo4j)
 * 
 * ⚠️ À IMPLÉMENTER ENSEMBLE (MongoDB + Neo4j)
 * Cette fonctionnalité nécessite les deux bases de données.
 */
import { API_ENDPOINTS } from '../config/api';

/**
 * Récupère le nombre de films communs entre MongoDB et Neo4j
 * @returns {Promise<Object>} Statistiques des films communs
 * 
 * TODO: Implémenter l'appel API une fois les deux backends prêts
 * Endpoint attendu: GET /stats/common-movies
 * 
 * Réponse attendue:
 * {
 *   count: 42,
 *   common_movies: ["Inception", "The Matrix", ...],
 *   mongodb_total: 100,
 *   neo4j_total: 85
 * }
 */
export const getCommonMoviesStats = async () => {
  // TODO: Décommenter quand les deux backends seront prêts
  /*
  const response = await fetch(API_ENDPOINTS.COMMON_MOVIES);
  if (!response.ok) throw new Error('Erreur lors du chargement des statistiques');
  return response.json();
  */
  
  // Données fictives temporaires
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        count: 2,
        common_movies: ['Inception', 'The Matrix'],
        mongodb_total: 3,
        neo4j_total: 5
      });
    }, 500);
  });
};
