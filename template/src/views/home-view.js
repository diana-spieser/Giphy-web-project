import { apiFuncTrending } from '../API-requests/API-engine.js';
import { mapGifContainer } from '../events/helper.js';

export const toHomeView = async () => {
  const data = await apiFuncTrending();
  const renderTrending = mapGifContainer(data);
  const container = document.querySelector('#container');
  container.innerHTML = `<div class="trending">Trending 🔥</div>
  <div class="trending-gifs">${renderTrending}</div>`;
};
