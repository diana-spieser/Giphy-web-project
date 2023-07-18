import { EMPTY_HEART, FULL_HEART } from '../common/constants.js';
import { addFavorite, getFavorites, removeFavorite } from '../data/favorites.js';
import { q } from './helper.js';
import { renderFavorites } from './navigation-events.js';

export const toggleFavoriteStatus = (gifId) => {
  const favorites = getFavorites();
  const heartSpan = document.querySelector(`[data-gif-id="${gifId}"]`);

  if (favorites.includes(gifId)) {
    removeFavorite(gifId);
    heartSpan.classList.remove('active');
    heartSpan.innerHTML = EMPTY_HEART;
  } else {
    addFavorite(gifId);
    heartSpan.classList.add('active');
    heartSpan.innerHTML = FULL_HEART;
  }

  if (q('.favorite-gifs') || q('.swiper') ) {
    renderFavorites();
  }
};

export const renderFavoriteStatus = (gifId) => {
  const favorites = getFavorites();

  return favorites.includes(gifId) ?
    `<span class="add-fav active" data-gif-id="${gifId}">${FULL_HEART}</span>` :
    `<span class="add-fav" data-gif-id="${gifId}">${EMPTY_HEART}</span>`;
};
