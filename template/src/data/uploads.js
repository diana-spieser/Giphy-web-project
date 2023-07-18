const uploads = JSON.parse(localStorage.getItem('uploadedGifs')) || [];
export const getUploads = () => [...uploads];
