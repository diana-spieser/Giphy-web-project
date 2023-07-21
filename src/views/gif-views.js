import { apiFuncFetchByID } from '../API-requests/API-engine.js';
import { q } from '../events/helper.js';
import { renderFavoriteStatusDetails } from '../events/favorites-events.js';

/**
 * Fetches data by ID and renders the detailed gif information on the modal page inside the #container element.
 *
 * @param {string} dataId - The ID of the gif to fetch and display.
 * @return {Promise<void>} A promise that resolves once the data is fetched and displayed on the page.
 */
export const getElement = async (dataId) => {
  const container = q('#container');
  const data = await apiFuncFetchByID(dataId);
  const content = document.createElement('div');
  content.className = `detailedInformation`;

  if (data.user === undefined) {
    content.innerHTML = `
        <div ><i class="fa-solid fa-circle-xmark close"></i></div>
        <div class="rightContainer">
        <p>${data.title}</p> <img src="${data.images.downsized.url}">
        <span class="favDetailsWrap">
        ${renderFavoriteStatusDetails(data.id)}
        </span>
        </div>
        `;
    container.append(content);
  } else {
    content.innerHTML = `
        <div ><i class="fa-solid fa-circle-xmark close"></i></div>
        <div class="leftContainer"> 
           <div>
            <div class="userDetails">
                <img src="${data.user.avatar_url}" alt="${data.display_name}">
                <div class="details">
                <h2>${data.user.display_name}</h2>
                <p>@${data.user.username}</p>
                </div>
            </div>
    
            <div class="description">
                <p class="text-container">${data.user.description}</P>
                <button class="btnCollapse">Read More</button>
            </div>
            <div class="social">
                <p>Follow on:</p>
    
                <i class="fa-brands fa-square-facebook"></i>
               <a href="${data.user.instagram_url}"><i class="fa-brands fa-instagram"></i></a>
                <i class="fa-brands fa-twitter"></i>
            </div>
            <div class="source">
                <p>Source:</p>
                <a href="${data.user.website_url}" target="_blank">${data.user.website_url}</a>
            </div>
           </div>
        </div>
        <div class="rightContainer">
            <p>${data.title}</p> <img src="${data.images.downsized.url}" alt="${data.title}">
            <span class="favDetailsWrap">
            ${renderFavoriteStatusDetails(data.id)}
            </span>
        </div>
        `;
    container.append(content);
  }
};
