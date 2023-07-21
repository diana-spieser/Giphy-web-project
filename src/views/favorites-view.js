import { apiFuncRandomGif } from '../API-requests/API-engine.js';
import { FULL_HEART } from '../common/constants.js';
import {
  mapGifContainer,
  fetchArrOfGifs,
  mapRandomGifContainer,
} from '../events/helper.js';

/**
 * Converts an array of favorite GIFs into a view for displaying the favorites.
 * If there are no favorites, it displays a section to swipe and view random GIFs.
 *
 * @param {Array} favorites - An array of strings representing the URLs of favorite GIFs.
 * @return {String} The HTML content for displaying the favorite GIFs or the random GIFs.
 */
export const toFavoritesView = async (favorites) => {
  const favoriteGifs = await fetchArrOfGifs(favorites);

  let favoritesContent = '';
  let message =
    favorites.length > 0 ?
      '' :
      `You don&rsquo;t have any favorites yet! Add to your favs by clicking the ${FULL_HEART} around GIPHY.`;

  if (favoriteGifs.length > 0) {
    favoritesContent = mapGifContainer(favoriteGifs);
  } else {
    const randomGifPromises = Array.from({ length: 4 }, () =>
      apiFuncRandomGif(),
    );
    const randomGifs = await Promise.all(randomGifPromises);
    favoritesContent = mapRandomGifContainer(randomGifs);
    message = `You don&rsquo;t have any favorites yet! Add to your favs by clicking the ${FULL_HEART} around GIPHY.`;
  }

  const title =
    favorites.length > 0 ? 'Favorite GIFs' : 'Swipe to view random GIFs';

  if (favorites.length > 0) {
    return `
      <div id="favorites">
        <h1 class="section-title random-section-title">${title}:</h1>
          <div class="bottom-line"></div>
        <div class="favorite-gifs">
          ${favoritesContent}
        </div>
      </div>
    `;
  } else {
    return `
      <br>
      <div id="favorites">
        <div class="favorites-box">
          <p class="favorites-message">${message}</p>
        </div>
        <h1 class="section-title random-section-title">${title}:</h1>
          <div class="bottom-line"></div>
        <br />
         <div id="swiper-favs-container">

        <div class="swiper" id="swiper-favs">
          <div class="swiper-wrapper">
            ${favoritesContent}
            <div class="swiper-pagination"></div>
          </div>
        </div>
       </div>
      </div>
    `;
  }
};
