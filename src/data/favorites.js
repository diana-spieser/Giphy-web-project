let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

/**
 * Add gifId to favorites array and save it to localStorage.
 * @param {*} gifId - The GIF ID to be added to favorites.
 */
export const addFavorite = (gifId) => {
  if (favorites.find(id => id === gifId)) {
    return;
  }

  favorites.push(gifId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

/**
 * Remove gifId from favorites array and save it to localStorage.
 * @param {*} gifId - The GIF ID to be removed from favorites.
 */
export const removeFavorite = (gifId) => {
  favorites = favorites.filter(id => id !== gifId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

/**
 * Get favorites array.
 * @return {Array} - An array containing the GIF IDs that are favorited.
 */
export const getFavorites = () => [...favorites];
