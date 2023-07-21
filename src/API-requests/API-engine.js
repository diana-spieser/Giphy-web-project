import { API_KEY_1, displayLimit, displayLimit2 } from '../common/constants.js';

/**
 * Fetches trending GIFs from the Giphy API.
 *
 * @param {number} limit - The maximum number of trending GIFs to fetch.
 * @param {number} offset - Specifies the starting position of the results. Default: 0, Maximum: 4999.
 * @returns {Promise<Array>} A promise that resolves to an array of trending GIFs.
 *
 * @throws {Error} If there is an error during the API request or response parsing.
 */
export const apiFuncTrending = async (limit = displayLimit, offset = 0) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY_1}&limit=${limit}&offset=${offset}&q=`
    );
    const responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    throw new Error('Failed to fetch trending GIFs: ' + error.message);
  }
};

/**
 * Fetches emoji from the Giphy API.
 *
 * @return {Promise<Array>} A promise that resolves to an array of emoji GIFs.
 *
 * @throws {Error} If there is an error during the API request or response parsing.
 */
export const apiFuncEmoji = async () => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v2/emoji?api_key=${API_KEY_1}&limit=${displayLimit}&offset=17`,
    );
    const responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    throw new Error('Failed to fetch emoji GIFs: ' + error.message);
  }
};

/**
 * Fetches search results from the Giphy API based on a search query and page number.
 *
 * @param {string} searchTitle - The search query.
 * @param {number} page - The page number (starting from 1).
 * @return {Promise<Array>} A promise that resolves to an array of search result GIFs.
 *
 * @throws {Error} If there is an error during the API request or response parsing.
 */
export const apiFuncSearch = async (searchTitle, page) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY_1}&limit=${displayLimit}&q=${searchTitle}&offset=${
        (page - 1) * displayLimit
      }`,
    );
    const responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    throw new Error('Failed to fetch search result GIFs: ' + error.message);
  }
};

/**
 * Fetches a GIF by its ID from the Giphy API.
 *
 * @param {string} gifId - The GIF ID.
 * @return {Promise<Object>} A promise that resolves to a GIF object.
 *
 * @throws {Error} If there is an error during the API request or response parsing.
 */
export const apiFuncFetchByID = async (gifId) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY_1}`,
    );
    const responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    throw new Error('Failed to fetch GIF by ID: ' + error.message);
  }
};

/**
 * Fetches a random GIF from the Giphy API.
 *
 * @return {Promise<Object>} A promise that resolves to a random GIF object.
 *
 * @throws {Error} If there is an error during the API request or response parsing.
 */
export const apiFuncRandomGif = async () => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY_1}`,
    );
    const responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    throw new Error('Failed to fetch random GIF: ' + error.message);
  }
};

/**
 * Uploads a GIF to the Giphy API.
 *
 * @param {*} formData - The form data containing the GIF to upload.
 * @return {Promise<Object>} A promise that resolves to the uploaded GIF object.
 *
 * @throws {Error} If there is an error during the API request or response parsing.
 */
export const apiFuncUpload = async (formData) => {
  try {
    const response = await fetch(
      `https://upload.giphy.com/v1/gifs?api_key=${API_KEY_1}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('Failed to upload GIF: ' + error.message);
  }
};
