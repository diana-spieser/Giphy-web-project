
// import { apiFuncTrending } from '../API-requests/API-engine.js';
// import { formatGifContainer, mapGifContainer, q } from '../events/helper.js';

// /**
//  * Fetches trending GIFs from the Giphy API and generates the HTML content for the trending view.
//  *
//  * @param {number} limit - The number of trending GIFs to fetch.
//  * @param {number} offset - The starting position of the results in the API response.
//  * @return {Promise<string>} A promise that resolves with the HTML content for the trending view,
//  * containing the fetched trending GIFs.
//  * @throws {Error} If there is an error during the API request or response parsing.
//  */


// export const toTrendingView = async (limit, page) => {
//   const offset = limit * (page - 1); // Calculate the offset based on the current page
//   const data = await apiFuncTrending(limit, offset);
//   const renderTrending = data
//     .map((el, index) => formatGifContainer(el, index % 2 === 0))
//     .join('');

//   return `
//     <div class="trending">Trending 🔥</div>
//     <div class="grid-container">
//       <div class="grid">
//         <div class="grid-sizer"></div>
//         <div class="gutter-sizer"></div>
//         ${renderTrending}
//       </div>
//     </div>
//     <!-- Add a data attribute to store the current page number -->
//     <div class="scroll-up" data-page="${page}">
//       <button class="scroll-up-button">
//         <i class="fas fa-chevron-up"></i> Scroll Up
//       </button>
//     </div>
//   `;
// };
