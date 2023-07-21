// /**
//  * Redirects to the trending view and fetches the next batch of trending GIFs.
//  *
//  * @async
//  * @function redirectToTrendingView
//  *
//  * @throws {Error} If there is an error during the API request or response parsing.
//  */
// import { toTrendingView } from '../views/trending-view.js';
// import { initMasonry, q } from '../events/helper.js';

// let currentOffset = 0; // Initialize the current offset

// export const redirectToTrendingView = async () => {
//   try {
//     // Increment the offset for the next call to fetch the next batch of trending GIFs
//     currentOffset += 10;

//     // Fetch 30 trending GIFs (10 new ones) from the updated offset
//     const trendingContent = await toTrendingView(30, currentOffset);
//     q('#container').innerHTML = trendingContent;
//     initMasonry();
//   } catch (error) {
//     throw new Error('Failed to redirect to trending view: ' + error.message);
//   }
// };


// export const handleInfiniteScroll = async () => {
//   const scrollThreshold = 200; // The distance from the bottom of the page to trigger infinite scroll
//   const scrollPosition = window.innerHeight + window.scrollY;
//   const bodyHeight = document.body.offsetHeight;

//   // Check if the user has scrolled to the bottom of the page
//   if (bodyHeight - scrollPosition < scrollThreshold) {
//     const container = document.querySelector('.grid');
//     const currentPage = parseInt(container.dataset.page) || 1;

//     // Load the next page of trending GIFs
//     const nextPage = currentPage + 1;
//     const newContent = await toTrendingView(14, nextPage);

//     // Append the new content to the Masonry layout
//     container.innerHTML += newContent;

//     // Increment the page number in the data attribute
//     container.dataset.page = nextPage;

//     // Initialize Masonry for the newly added GIFs
//     initMasonry();
//   }
// };
// // Wait for the DOM to be fully loaded
// document.addEventListener('DOMContentLoaded', () => {
//   // Attach the infinite scroll event listener to the window
//   window.addEventListener('scroll', handleInfiniteScroll);
// });
