import { mapGeneralContainer, q } from './helper.js';
import { searchPagination } from '../data/search.js';
import { apiFuncSearch } from '../API-requests/API-engine.js';

/**
 * Clears the value of the search input field.
 * @return {void}
 */
export const clearSearchInput = () =>
  (document.getElementById('search').value = '');

/**
 * Hides the search container.
 */
export const hideSearch = () => {
  const searchContainer = q('#search-container');
  searchContainer.style.display = 'none';
};

/**
 * Displays the search container.
 */
export const displaySearch = () => {
  const searchContainer = q('#search-container');
  searchContainer.style.display = 'flex';
};

/**
 * Changes the page of the search results and updates the displayed GIFs.
 * Fetches the new page of search results from the API and maps the container to update the view.
 * Also updates the page counter to show the current page number and total pages.
 *
 * @return {Promise<void>} A promise that resolves once the search results are updated on the page.
 */
export const changePage = async () => {
  const searchTerm = searchPagination.search.term;
  const currentPage = searchPagination.search.page;
  const data = await apiFuncSearch(searchTerm);

  const renderGIFs = mapGeneralContainer(
    data.slice((currentPage - 1) * 20, currentPage * 20)
  );
  const searchGifs = q('.search-gifs');
  searchGifs.innerHTML = renderGIFs;

  const pageCounter = q('.page-counter');
  pageCounter.textContent = `Page ${searchPagination.search.page} of ${searchPagination.search.totalPages}`;
};
