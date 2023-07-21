import { EMPTY_HEART, FULL_HEART } from '../common/constants.js';
import { addFavorite, getFavorites, removeFavorite } from '../data/favorites.js';
import { q } from './helper.js';
import { renderFavorites } from './navigation-events.js';

/**
 * Toggles the favorite status of a GIF.
 *
 * @param {string} gifId - The ID of the GIF.
 */
export const toggleFavoriteStatus = (gifId) => {
  const favorites = getFavorites();
  const heartSpan = q(`[data-gif-id="${gifId}"]`);

  if (favorites.includes(gifId)) {
    removeFavorite(gifId);
    heartSpan.classList.remove('active');
    heartSpan.innerHTML = EMPTY_HEART;
  } else {
    addFavorite(gifId);
    heartSpan.classList.add('active');
    heartSpan.innerHTML = FULL_HEART;
  }

  if (q('.favorite-gifs') || q('#swiper-favs')) {
    if (q('.detailedInformation') !== null) {
      return;
    }
    renderFavorites();
  }
};

/**
 * Renders the favorite status of a GIF.
 *
 * @param {string} gifId - The ID of the GIF.
 * @return {string} The HTML representation of the favorite status.
 */
export const renderFavoriteStatus = (gifId) => {
  const favorites = getFavorites();

  return favorites.includes(gifId) ?
    `<span class="add-fav active" data-gif-id="${gifId}">${FULL_HEART}</span>` :
    `<span class="add-fav" data-gif-id="${gifId}">${EMPTY_HEART}</span>`;
};

/**
 * Renders the favorite status of a GIF for detailed information.
 *
 * @param {string} gifId - The ID of the GIF.
 * @return {string} The HTML representation of the favorite status for detailed information.
 */
export const renderFavoriteStatusDetails = (gifId) => {
  const favorites = getFavorites();

  return favorites.includes(gifId) ?
    `<div class="heartContainer"><p>Favorite:</p> <span class="add-favDetail active" data-gif-id="${gifId}">${FULL_HEART}</span></div>` :
    `<div class="heartContainer"><p>Favorite:</p> <span class="add-favDetail" data-gif-id="${gifId}">${EMPTY_HEART}</span></div>`;
};
