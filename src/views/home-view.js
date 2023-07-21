import { apiFuncTrending, apiFuncEmoji } from '../API-requests/API-engine.js';
import {
  mapGifContainer,
  mapHomePageGifContainer,
  q,
} from '../events/helper.js';

/**
 * Fetches trending and emoji data from APIs and generates the HTML content for the home view.
 *
 * @return {Promise<string>} A promise that resolves with the HTML content for the home view,
 * containing trending GIFs and emojis.
 */
export const toHomeView = async () => {
  const initialData = await apiFuncTrending(5, 0);
  const data2 = await apiFuncEmoji();
  const renderEmoji = mapHomePageGifContainer(data2);
  const renderTrending = mapGifContainer(initialData);

  return `
   <div class="trending-conainer">
    <div class="trending">Trending 🔥</div>
  <button class="see-more-button">
      See More <i class="fas fa-chevron-right"></i>
    </button>
    </div>
    <div class="trending-gifs">${renderTrending}</div>
    <div class="trending">Emojis 😀</div>
    <div class="trending-gifs">
      <div class="swiper" id="trending-swiper">
        <div class="swiper-wrapper">${renderEmoji}</div>
      </div>
    </div>
  `;
};
