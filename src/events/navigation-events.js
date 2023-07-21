import {
  ABOUT,
  CONTAINER_SELECTOR,
  FAVORITES,
  HOME,
  UPLOADS,
} from '../common/constants.js';
import { toFavoritesView } from '../views/favorites-view.js';
import { toHomeView } from '../views/home-view.js';
import { toAboutView } from '../views/about-view.js';
import { toUploadsView } from '../views/uploads-view.js';
import { initSwiper, initSwiper2, q, setActiveNav } from './helper.js';
import { clearSearchInput, displaySearch, hideSearch } from './search.js';
import { getFavorites } from '../data/favorites.js';

/**
 * Loads the specified page and performs the necessary actions based on the page parameter.
 *
 * @param {string} [page=''] - The page to load.
 */
export const loadPage = async (page = '') => {
  switch (page) {
  case HOME:
    setActiveNav(HOME);
    displaySearch();
    clearSearchInput();
    await renderHome();
    break;
  case UPLOADS:
    setActiveNav(UPLOADS);
    hideSearch();
    await renderUploads();
    break;
  case FAVORITES:
    setActiveNav(FAVORITES);
    displaySearch();
    clearSearchInput();
    await renderFavorites();
    break;
  case ABOUT:
    setActiveNav(ABOUT);
    hideSearch();
    await renderAbout();
    break;
  default:
    // For unknown routes, redirect to the home page
    window.history.replaceState({}, '', '/' + HOME);
    setActiveNav(HOME);
    displaySearch();
    clearSearchInput();
    await renderHome();
  }
};

/**
 * Renders the home page.
 */
const renderHome = async () => {
  const container = q(CONTAINER_SELECTOR);
  container.innerHTML = await toHomeView();
  initSwiper2();
};

/**
 * Renders the favorites page.
 */
export const renderFavorites = async () => {
  const favorites = getFavorites();
  const favoritesView = await Promise.resolve(toFavoritesView(favorites));
  q(CONTAINER_SELECTOR).innerHTML = favoritesView;
  initSwiper();
};

/**
 * Renders the about page.
 */
const renderAbout = () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = toAboutView();
};

/**
 * Renders the uploads page.
 */
export const renderUploads = async () => {
  q(CONTAINER_SELECTOR).innerHTML = await toUploadsView();
};

// Create a function to handle URL changes and trigger page rendering
const handleUrlChange = () => {
  const pageName = getPageNameFromUrl();
  loadPage(pageName);
};

// Add a function to extract the page name from the URL
const getPageNameFromUrl = () => {
  const path = window.location.pathname;
  const pageName = path.substring(1); // Remove the leading '/'
  return pageName || HOME; // If no page name, default to the HOME page
};

// Call the handleUrlChange function when the page loads to render the initial page
document.addEventListener('DOMContentLoaded', handleUrlChange);

// Get all navigation links with the class "nav-link"
const navLinks = document.querySelectorAll('.nav-link');

// Add a click event listener to each navigation link
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior (e.g., page reload)

    // Get the data-page attribute value
    const page = link.dataset.page;

    // Call a function to load/render the corresponding view based on the data-page value
    loadPage(page);

    // Update the URL to reflect the clicked link
    history.pushState({}, '', `/${page}`);
  });
});

// Call the handleUrlChange function whenever the URL changes (e.g., when the user clicks on the browser's back/forward buttons)
window.addEventListener('popstate', handleUrlChange);
