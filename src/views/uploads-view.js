/* eslint-disable max-len */
import { fetchArrOfGifs, mapGeneralContainer } from '../events/helper.js';
import { getUploads } from '../data/uploads.js';

/**
 * Generates the HTML content for the uploads view, displaying the uploaded GIFs and upload form.
 *
 * @return {string} The HTML content for the uploads view.
 */
export const toUploadsView = async () => {
  const uploads = getUploads();

  let uploadsContent;

  if (uploads.length === 0) {
    uploadsContent = `<p id="no-uploads"> You haven't uploaded any gifs yet.</p>`;
  } else {
    const fetchUploads = await fetchArrOfGifs(uploads);
    uploadsContent = mapGeneralContainer(fetchUploads);
  }

  return `
  <div id="uploads">
    <div class="content uploads">
    <h1 class="section-title">
    <span class="giphy-title"> GIPHY</span>
      <span class="upload-text">Upload 📂</span> </h1>
      <div class="bottom-line"></div>
    // eslint-disable-next-line max-len
    <picture><source type="image/webp" srcset="https://media1.giphy.com/media/qo4T3YNcaT2IMGZ8tY/200.webp?cid=82a1493btaranrwemegxjlqlnnzh67fagu6upj31sm27ajmu&amp;ep=v1_gifs_gifId&amp;rid=200.webp&amp;ct=s"><img class="giphy-gif-img giphy-img-loaded" src="https://media1.giphy.com/media/qo4T3YNcaT2IMGZ8tY/200.gif?cid=82a1493btaranrwemegxjlqlnnzh67fagu6upj31sm27ajmu&amp;ep=v1_gifs_gifId&amp;rid=200.gif&amp;ct=s" width="258" height="224" alt="GiphyDevGifRepo  Sticker" style="background: rgba(0, 0, 0, 0);"></picture>


    <form id="upload-form">

    <input type="text" id="name-input" placeholder="Add a GIF Name" required /><br />
    <input type="text" id="author-input" placeholder="Add Author" required /><br />

    <div class="radioContainer">
      <input type="radio" id="url-option" name="upload-option" value="url"  />
      <label for="url-option">Upload from URL</label><br />
      <input type="radio" id="file-option" name="upload-option" value="file" checked />
      <label for="file-option">Upload from File</label>
    </div>

    <input type="url" id="url-input" placeholder="Add a source URL" /><br />
    <input type="file" id="gif-input" class="gifUpload" accept=".gif" /><br />

    <button type="submit" class="btnUpload">Upload</button>
    </form>
    </div>
    <h1 class="section-title">Your uploads:</h1>
    <div class="bottom-line"></div>
      <div class="uploaded-gifs">
      ${uploadsContent}
    </div>
  </div>
  `;
};
