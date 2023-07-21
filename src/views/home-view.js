import { apiFuncTrending, apiFuncEmoji } from '../API-requests/API-engine.js';
import {
  formatGifContainer,
  mapHomePageGifContainer,
  q,
  initMasonry,
} from '../events/helper.js';

let currentOffset = 0; // Initialize the current offset for infinite scroll

export const toHomeView = async () => {
  // Fetch initial trending GIFs (30 GIFs) with the current offset
  const initialData = await apiFuncTrending(30, currentOffset);
  const data2 = await apiFuncEmoji();
  const renderEmoji = mapHomePageGifContainer(data2);

  // Map the trending data to HTML format, applying the "randomize" class to GIFs at even indices
  const renderTrending = initialData
    .map((el, index) => formatGifContainer(el, index % 2 === 0))
    .join('');

  return `
      <div class="trending">Emojis 😀</div>
    <div class="trending-gifs">
      <div class="swiper" id="trending-swiper">
        <div class="swiper-wrapper">${renderEmoji}</div>
      </div>
    </div>
    <div class="trending">Trending 🔥</div>
    <div class="grid-container">
      <div class="grid">
        <div class="grid-sizer"></div>
        <div class="gutter-sizer"></div>
        ${renderTrending}
      </div>
    </div>
  `;
};

// Add infinite scroll event listener to trigger infinite scroll on the home page
window.addEventListener('scroll', async () => {
  // Check if the "grid" element exists in the DOM
  const gridElement = q('.grid');
  if (!gridElement) return;

  // Get the bottom of the page
  const scrollThreshold = 200;
  const scrollPosition = window.innerHeight + window.scrollY;
  const bodyHeight = document.body.offsetHeight;

  // Check if the user has scrolled to the bottom of the page
  if (bodyHeight - scrollPosition < scrollThreshold) {
    // Increment the offset for the next call to fetch the next batch of trending GIFs
    currentOffset += 30;

    // Fetch the next batch of trending GIFs (30 GIFs) with the updated offset
    const newData = await apiFuncTrending(30, currentOffset);

    // Map the new data to HTML format and append it to the existing trending GIFs
    const newRenderTrending = newData
      .map((el, index) => formatGifContainer(el, index % 2 === 0))
      .join('');

    // Append the new content to the "grid" element
    gridElement.innerHTML += newRenderTrending;

    // Initialize Masonry for the newly added GIFs
    initMasonry();
  }
});
