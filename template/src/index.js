import { HOME } from './common/constants.js';
import { loadPage } from './events/navigation-events.js';
import { toggleFavoriteStatus } from './events/favorites-events.js';
import { toSearchView } from './views/search-view.js';
import { uploadGif } from './events/upload.js';
import { getElement } from './views/gif-views.js';
import { toggleText } from './events/helper.js';
document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('click', async event => {
    // nav events
    if (event.target.classList.contains('nav-link')) {

      loadPage(event.target.getAttribute('data-page'));
    }

    // toggle favorite
    if (event.target.classList.contains('add-fav')) {
      toggleFavoriteStatus(event.target.getAttribute('data-gif-id'));
    }

    // search event - Search button clicked
    if (event.target.classList.contains('button-search')) {
      event.preventDefault();
      const container = document.querySelector('#container');
      container.innerHTML = '';
      const searchInput = document.getElementById('search');
      await toSearchView(searchInput.value);
    }
    // upload gif form event
    if (event.target.classList.contains('btnUpload')) {
      event.preventDefault();
      uploadGif();
    }

    if (event.target.classList.contains('gif') || event.target.classList.contains('fixed-size-gif') ) {
      event.preventDefault();
      const parentElement = event.target.parentNode;
      const dataId = parentElement.getAttribute('data-id');
      getElement(dataId);
    }

    if (event.target.classList.contains('close')) {
      event.preventDefault();
      const div = document.querySelector('.detailedInformation');
      div.remove();
    }
    if (event.target.classList.contains('btnCollapse')) {
      toggleText();
  }
  });

  document.addEventListener('keydown', async event => {
    if (event.target.classList.contains('search-bar')) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const container = document.querySelector('#container');
        container.innerHTML = '';
        const searchInput = document.getElementById('search');
        await toSearchView(searchInput.value);
      }
    }

    if (document.querySelector('.detailedInformation')) {
      if (event.key === 'Escape') {
        event.preventDefault();
        const div = document.querySelector('.detailedInformation');
        div.remove();
      }
    }
  });

  loadPage(HOME);
});
