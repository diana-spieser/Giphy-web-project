import { ABOUT, CONTAINER_SELECTOR, FAVORITES, HOME, UPLOADS } from '../common/constants.js';
// import { toAboutView } from '../views/about-view.js';
import { toFavoritesView } from '../views/favorites-view.js';
import { toHomeView } from '../views/home-view.js';
import { toUploadsView } from '../views/uploads-view.js';
import { initSwiper, setActiveNav} from './helper.js';
import { clearSearchInput, displaySearch, hideSearch } from './search.js';
import { getFavorites } from '../data/favorites.js';


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

const renderHome = () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = toHomeView();
};

export const renderFavorites = async () => {
  const favorites = getFavorites();
  const favoritesView = await Promise.resolve(toFavoritesView(favorites));
  document.querySelector(CONTAINER_SELECTOR).innerHTML = favoritesView;
  initSwiper();

};

const renderAbout = async () => {
  try {
    const res = await fetch('about.html');
    if (!res.ok) {
      throw new Error('Oops! Something went wrong. Failed to fetch about.html')
    }
    const aboutContent = await res.text();
    document.querySelector(CONTAINER_SELECTOR).innerHTML = aboutContent;
  } catch (error) {
    console.log(error);
  }
};

export const renderUploads = async () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = await toUploadsView();
};
