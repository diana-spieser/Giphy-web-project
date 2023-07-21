/**
 * An array representing the uploaded GIFs stored in localStorage.
 * @type {Array}
 */
const uploads = JSON.parse(localStorage.getItem('uploadedGifs')) || [];

/**
 * Get the array of uploaded GIFs.
 *
 * @return {Array} An array containing the uploaded GIFs.
 */
export const getUploads = () => [...uploads];
