import { apiFuncSearch } from '../API-requests/API-engine.js';
import { mapGeneralContainer, q } from '../events/helper.js';
import { changePage } from '../events/search.js';
import { searchPagination } from '../data/search.js';

/**
 * Creates and displays pagination buttons for navigating through search results.
 * Adds event listeners to handle pagination and update the page content accordingly.
 */
const displayPagination = () => {
  const paginationContainer = document.createElement('div');
  paginationContainer.id = 'pagination';

  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
    <button class="scroll-up-button" id="prev">Prev</button>
    <button class="scroll-up-button" id="next">Next</button>
    <div class="page-counter">Page ${searchPagination.search.page} of ${searchPagination.search.totalPages}</div>
  `;

  paginationContainer.appendChild(div);

  /**
   * Append the pagination container to the appropriate location in the DOM
   */
  const container = q('#container');
  container.appendChild(paginationContainer);

  /**
   * Next page
   */
  q('#next').addEventListener('click', async () => {
    if (searchPagination.search.page < searchPagination.search.totalPages) {
      searchPagination.search.page++;
      await changePage();
    }

    /**
     * Scroll Up Button
     */
    if (q('.new-button') === null) {
      const scrollUpButton = document.createElement('button');
      scrollUpButton.classList.add('scroll-up-button');
      scrollUpButton.classList.add('new-button');
      scrollUpButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
      paginationContainer.appendChild(scrollUpButton);
      /**
       * Scroll to top of page
       */
      scrollUpButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });

  /**
   * Previous page
   */
  q('#prev').addEventListener('click', async () => {
    if (searchPagination.search.page > 1) {
      searchPagination.search.page--;
      await changePage();
    }
  });
};

/**
 * Displays the search results for a given search term by calling the API.
 * If there are more than 20 results, it displays pagination buttons for navigation.
 *
 * @param {string} searchTerm - The search term to use for fetching the GIFs.
 * @return {Promise<void>} A promise that resolves once the search results are displayed on the page.
 */
export const toSearchView = async (searchTerm) => {
  searchPagination.search.term = searchTerm;
  searchPagination.search.page = 1;
  const data = await apiFuncSearch(searchTerm);
  searchPagination.search.totalResults = data.length;
  searchPagination.search.totalPages = Math.ceil(data.length / 20);

  const renderGIFs = mapGeneralContainer(data.slice(0, 20));
  const container = q('#container');
  const searchGifs = document.createElement('div');
  searchGifs.className = 'search-gifs';
  container.appendChild(searchGifs);
  searchGifs.innerHTML = renderGIFs;

  if (searchPagination.search.totalResults > 20) {
    displayPagination();
  }
};
