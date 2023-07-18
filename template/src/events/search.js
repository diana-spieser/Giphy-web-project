import { q } from './helper.js';

export const clearSearchInput = () => document.getElementById('search').value = '';

export const hideSearch = () => {
  const searchContainer = q('#search-container');
  searchContainer.style.display = 'none';
};

export const displaySearch = () => {
  const searchContainer = q('#search-container');
  searchContainer.style.display = 'flex';
};
