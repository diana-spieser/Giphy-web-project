/* eslint-disable no-unused-vars */
import { renderFavoriteStatus } from './favorites-events.js';
import { apiFuncFetchByID } from '../API-requests/API-engine.js';

/**
 * Returns the first element that matches the given CSS selector.
 *
 * @param {string} selector - The CSS selector.
 * @return {Element} The matching element.
 */
export const q = (selector) => document.querySelector(selector);

/**
 * Returns a list of elements that match the given CSS selector.
 *
 * @param {string} selector - The CSS selector.
 * @return {NodeList} The list of matching elements.
 */
export const qs = (selector) => document.querySelectorAll(selector);

/**
 * Sets the active navigation link based on the current page.
 *
 * @param {string} page - The current page.
 */
export const setActiveNav = (page) => {
  const navs = qs('a.nav-link');

  Array.from(navs).forEach((element) =>
    element.getAttribute('data-page') === page
      ? element.classList.add('active')
      : element.classList.remove('active')
  );
};

/**
 * Maps and joins an array of GIF data to HTML format for the gif-container.
 *
 * @param {Object[]} data - The array of GIF data.
 * @return {string} The HTML representation of the gif-container.
 */
export const mapGifContainer = (data) =>
  data.map((el) => formatGifContainer(el)).join('');

/**
 * Maps and joins an array of GIF data to HTML format for the random GIF container.
 *
 * @param {Object[]} data - The array of GIF data.
 * @return {string} The HTML representation of the random GIF container.
 */
export const mapRandomGifContainer = (data) =>
  data.map((el) => formatRandomGifContainer(el)).join('');

export const mapHomePageGifContainer = (data) =>
  data.map((el, index) => formatHomePageGifContainer(el, index === 0)).join('');

export const mapGeneralContainer = (data) =>
  data.map((el) => formatSearchGifContainer(el)).join('');

/**
 * Formats a GIF container HTML element based on the GIF data.
 *
 * @param {Object} el - The GIF data.
 * @param {boolean} isFirst - Whether it's the first GIF container.
 * @return {string} The HTML representation of the GIF container.
 */
/**
 * Formats a GIF container HTML element based on the GIF data.
 *
 * @param {Object} el - The GIF data.
 * @param {boolean} isFirst - Whether it's the first GIF container.
 * @return {string} The HTML representation of the GIF container.
 */
export const formatGifContainer = (el, isFirst) => {
  // Add the "randomize" class to the first GIF container
  const randomizeClass = isFirst ? 'randomize' : '';

  // Use optional chaining to check if 'el.images.downsized' exists before accessing 'el.images.downsized.url'
  const imageUrl = el.images.downsized?.url || '';

  return `<div class="grid-item ${randomizeClass}" data-id="${el.id}">
    <img src="${imageUrl}" alt="${el.title}">
    <span class="add-fav" data-gif-id="${el.id}">${renderFavoriteStatus(el.id)}</span>
  </div>`;
};

/**
 * Formats a random GIF container HTML element based on the GIF data.
 *
 * @param {Object} el - The GIF data.
 * @return {string} The HTML representation of the random GIF container.
 */
export const formatRandomGifContainer = (el) => {
  return ` <div class="swiper-slide" data-id="${el.id}">
            <img src="${
              el.images.original.url
            }" alt="GIF" class="fixed-size-gif">
                <span class="add-fav" data-gif-id="${
                  el.id
                }">${renderFavoriteStatus(el.id)}</span>
            </div>`;
};

/**
 * Formats a home page GIF container HTML element based on the GIF data.
 *
 * @param {Object} el - The GIF data.
 * @return {string} The HTML representation of the home page GIF container.
 */
export const formatHomePageGifContainer = (el) => {
  return ` <div class="swiper-slide" id="trending-gif" data-id="${el.id}">
            <img src="${el.images.fixed_height.url}" alt="GIF" class="custom-size-gif">
                <span class="add-fav" data-gif-id="${ el.id}">${renderFavoriteStatus(el.id)}</span>
            </div>`;
};

/**
 * Formats a GIF container HTML element based on the GIF data.
 *
 * @param {Object} el - The GIF data.
 * @return {string} The HTML representation of the GIF container.
 */
export const formatSearchGifContainer = (el) => {
  return `<div class="gif-container" data-id="${el.id}">
    <img src="${el.images.original.url}" alt="${el.title}" class="gif">
    <span class="add-fav" data-gif-id="${el.id}">${renderFavoriteStatus( el.id)}</span>
      </div>`;
};

/**
 * Fetches an array of GIFs asynchronously.
 *
 * @param {string[]} array - The array of GIF IDs.
 * @return {Promise<Object[]>} A promise that resolves to the array of fetched GIF data.
 */
export const fetchArrOfGifs = async (array) => {
  const fetchUploads = [];

  for (const gif of array) {
    const fetchGif = await apiFuncFetchByID(gif);
    fetchUploads.push(fetchGif);
  }

  return fetchUploads;
};

/**
 * Initializes the Swiper slider with cube effect.
 */
export const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    effect: 'cube',
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    cubeEffect: {
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 1,
      shadowOpacity: 1, // Adjust the opacity of the shadows for better visibility
      shadowColor: 'white', // Set the color of the shadows to white
      shadowRotate: -25, // Rotate the cube effect to the top
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });
};

/**
 * Initializes the Swiper slider with responsive breakpoints.
 */
export const initSwiper2 = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 5,
      },
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });
};

/**
 * Toggles the visibility of the text container and updates the button text.
 */
export const toggleText = () => {
  const container = q('.text-container');

  if (container.classList.contains('collapsed')) {
    container.classList.remove('collapsed');
    q('.btnCollapse').textContent = 'Read More';
  } else {
    container.classList.add('collapsed');
    q('.btnCollapse').innerHTML = `Read Less`;
  }
};

// Function to initialize Masonry
export const initMasonry = () => {
  const masonry = new Masonry('.grid', {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true,
  });
};
