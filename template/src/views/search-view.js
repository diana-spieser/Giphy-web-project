import { apiFuncSearch } from '../API-requests/API-engine.js';
import { mapGifContainer } from '../events/helper.js';

export const toSearchView = async (searchTerm) => {
  const data = await apiFuncSearch(searchTerm);
  const renderGIFs = mapGifContainer(data);
  const container = document.querySelector('#container');
  const searchGifs = document.createElement('div');
  searchGifs.className = 'search-gifs';
  container.appendChild(searchGifs);
  searchGifs.innerHTML = renderGIFs;
};
