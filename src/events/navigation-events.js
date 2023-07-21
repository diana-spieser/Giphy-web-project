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
    return renderHome();
  case UPLOADS:
    setActiveNav(UPLOADS);
    hideSearch();
    return renderUploads();
  case FAVORITES:
    setActiveNav(FAVORITES);
    displaySearch();
    clearSearchInput();
    return renderFavorites();
  case ABOUT:
    setActiveNav(ABOUT);
    hideSearch();
    return renderAbout();

  default:
    return null;
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
