import { renderFavoriteStatus } from './favorites-events.js';
import { apiFuncFetchByID } from '../API-requests/API-engine.js';
export const q = (selector) => document.querySelector(selector);
export const qs = (selector) => document.querySelectorAll(selector);

export const setActiveNav = (page) => {
  const navs = qs('a.nav-link');

  Array.from(navs).forEach((element) =>
    element.getAttribute('data-page') === page ?
      element.classList.add('active') :
      element.classList.remove('active'),
  );
};

export const mapGifContainer = (data) =>
  data.map((el) => formatGifContainer(el)).join('');
export const mapRandomGifContainer = (data) =>
  data.map((el) => formatRandomGifContainer(el)).join('');


export const formatGifContainer = (el) => {
  return `<div class="gif-container" data-id="${el.id}">
    <img src="${el.images.downsized.url}" alt="${el.title}" class="gif">
    <span class="add-fav" data-gif-id="${el.id}">${renderFavoriteStatus(el.id)}</span>
      </div>`;
};

export const formatRandomGifContainer = (el) => {
  return ` <div class="swiper-slide" data-id="${el.id}">
            <img src="${el.images.fixed_height.url}" alt="GIF" class="fixed-size-gif">
                <span class="add-fav" data-gif-id="${el.id}">${renderFavoriteStatus(el.id)}</span>
            </div>`;
};

export const fetchArrOfGifs = async (array) => {
  const fetchUploads = [];

  for (const gif of array) {
    const fetchGif = await apiFuncFetchByID(gif);
    fetchUploads.push(fetchGif);
  }

  return fetchUploads;
};

export const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });
};

export function toggleText(){
  const container = q('.text-container');
  
  if (container.classList.contains('collapsed')) {
    container.classList.remove('collapsed');
    q('.btnCollapse').textContent = 'Read More';
  } else {
    container.classList.add('collapsed');
    q('.btnCollapse').innerHTML = `Read Less`;
  }
}
