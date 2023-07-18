import { apiFuncUpload } from '../API-requests/API-engine.js';
import { q } from './helper.js';
import { fetchArrOfGifs, mapGifContainer } from './helper.js';

export const uploadGif = async function() {
  let formData;

  if (q('#gif-input').files.length > 0 && q('#file-option').checked) {
    const file = q('#gif-input').files[0];
    formData = new FormData();
    formData.append('file', file);
  } else if (q('#url-input').value.trim().length > 0 && q('#url-option').checked) {
    const gifUrl = q('#url-input').value.trim();
    formData = new FormData();
    formData.append('source_image_url', gifUrl);
  } else {
    return;
  }

  try {
    const responseData = await apiFuncUpload(formData);
    const gifId = responseData.data.id;
    const uploadedItems = JSON.parse(localStorage.getItem('uploadedGifs')) || [];
    uploadedItems.push(gifId);
    localStorage.setItem('uploadedGifs', JSON.stringify(uploadedItems));
    showNotification('Item saved successfully!');
    const fetchUploads = await fetchArrOfGifs(uploadedItems);
    const uploadsContent = mapGifContainer(fetchUploads);
    q('.uploaded-gifs').innerHTML = uploadsContent;
    q('#name-input').value = '';
    q('#author-input').value = '';
    q('#url-input').value = '';
    q('#gif-input').value = '';
  } catch (error) {
    console.error('Error uploading GIF:', error);
  }
};

const showNotification = function(message) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  document.body.appendChild(notification);
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 5000);

  notification.addEventListener('animationend', () => {
    notification.remove();
  });
};

