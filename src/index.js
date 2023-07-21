import { HOME } from './common/constants.js';
import { loadPage, renderFavorites } from './events/navigation-events.js';
import { toggleFavoriteStatus, renderFavoriteStatusDetails } from './events/favorites-events.js';
import { toSearchView } from './views/search-view.js';
import { uploadGif } from './events/upload.js';
import { getElement } from './views/gif-views.js';
import { toggleText, q } from './events/helper.js';
import { redirectToTrendingView } from './data/render-trending.js';

// Function to dynamically import the main CSS file
const loadCSS = () => {
  import('/styles/main.css');
};

loadCSS();
document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('click', async event => {
    /**
     * Nav events
     */
    if (event.target.classList.contains('nav-link')) {
      loadPage(event.target.getAttribute('data-page'));
    }
    /**
     * Toggle favorite
     */
    if (event.target.classList.contains('add-fav')) {
      toggleFavoriteStatus(event.target.getAttribute('data-gif-id'));
    }
    /**
     * Toggle favorite through the gif details modal
     */
    if (event.target.classList.contains('add-favDetail')) {
      toggleFavoriteStatus(event.target.getAttribute('data-gif-id'));
      const detailedInfo = q('.favDetailsWrap');
      detailedInfo.innerHTML = renderFavoriteStatusDetails(
        event.target.getAttribute('data-gif-id'),
      );
    }
    /**
     * Search event - search button click
     */
    if (event.target.classList.contains('button-search')) {
      event.preventDefault();
      const container = q('#container');
      container.innerHTML = '';
      const searchInput = q('#search');
      await toSearchView(searchInput.value);
    }
    /**
     * Upload gif event
     */
    if (event.target.classList.contains('btnUpload')) {
      event.preventDefault();
      uploadGif();
    }
    /**
     * Opens modal for detailed gif information
     */
    if (
      event.target.classList.contains('custom-size-gif') ||
      event.target.classList.contains('fixed-size-gif') ||
      event.target.classList.contains('gif')
    ) {
      event.preventDefault();
      const parentElement = event.target.parentNode;
      const dataId = parentElement.getAttribute('data-id');
      getElement(dataId);
    }
    /**
     * Close modal
     */
    if (event.target.classList.contains('close')) {
      event.preventDefault();
      const div = q('.detailedInformation');
      div.remove();
      if (q('#favorites') !== null) {
        renderFavorites();
      }
    }
    /**
     * Read more button in modal
     */
    if (event.target.classList.contains('btnCollapse')) {
      toggleText();
    }
    /**
     * See more button in home view
     */
    if (event.target.classList.contains('see-more-button')) {
      event.preventDefault();
      redirectToTrendingView();
    }
    /**
     * Scroll up button
     */
    if (event.target.classList.contains('scroll-up-button')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  /**
   * Keydown event for search bar - Enter
   * Keydown event for detailed info modal - Escape
   */
  document.addEventListener('keydown', async event => {
    if (event.target.classList.contains('search-bar')) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const container = q('#container');
        container.innerHTML = '';
        const searchInput = q('#search');
        await toSearchView(searchInput.value);
      }
    }
    if (q('.detailedInformation')) {
      if (event.key === 'Escape') {
        event.preventDefault();
        const div = q('.detailedInformation');
        div.remove();
        if (q('#favorites') !== null) {
          renderFavorites();
        }
      }
    }
  });

  /**
   * Load home - default
   */
  loadPage(HOME);
});
