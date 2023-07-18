import { API_KEY_1, API_KEY_2, API_KEY_3, displayLimit } from '../common/constants.js';


export const apiFuncTrending = async () => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY_1}&limit=${displayLimit}&q=`);
  const responseJson = await response.json();
  return responseJson.data;
};

export const apiFuncSearch = async (searchTitle) => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY_1}&limit=${displayLimit}&q=${searchTitle}`);
  const responseJson = await response.json();
  return responseJson.data;
};

export const apiFuncFetchByID = async (gifId) => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY_1}`);
  const responseJson = await response.json();
  return responseJson.data;
};

export const apiFuncRandomGif = async () => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY_1}`);
  const responseJson = await response.json();
  return responseJson.data;
};

export const apiFuncUpload = async (formData) => {
  const response = await fetch( `https://upload.giphy.com/v1/gifs?api_key=${API_KEY_1}`,
    {
      method: 'POST',
      body: formData,
    },
  );
  const responseData = await response.json();
  return responseData;
};
