import { apiFuncTrending } from '../API-requests/API-engine.js';
import { mapGifContainer, q } from '../events/helper.js';

/**
 * Fetches trending GIFs from the Giphy API and generates the HTML content for the trending view.
 *
 * @param {number} limit - The number of trending GIFs to fetch.
 * @param {number} offset - The starting position of the results in the API response.
 * @return {Promise<string>} A promise that resolves with the HTML content for the trending view,
 * containing the fetched trending GIFs.
 * @throws {Error} If there is an error during the API request or response parsing.
 */
export const toTrendingView = async (limit, offset) => {
  const data = await apiFuncTrending(limit, offset);
  const renderTrending = mapGifContainer(data);

  return `
      <div class="trending">Trending 🔥</div>
      <div class="trending-gifs">${renderTrending}</div>
      <!-- Scroll Up Button -->
      <div class="scroll-up">
        <button class="scroll-up-button">
          <i class="fas fa-chevron-up"></i> Scroll Up
        </button>
      </div>
    `;
};
