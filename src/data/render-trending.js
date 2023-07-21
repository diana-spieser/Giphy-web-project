/**
 * Redirects to the trending view and fetches the next batch of trending GIFs.
 *
 * @async
 * @function redirectToTrendingView
 *
 * @throws {Error} If there is an error during the API request or response parsing.
 */
import { toTrendingView } from '../views/trending-view.js';
import { q } from '../events/helper.js';

let currentOffset = 0; // Initialize the current offset

export const redirectToTrendingView = async () => {
  try {
    // Increment the offset for the next call to fetch the next batch of trending GIFs
    currentOffset += 10;

    // Fetch 30 trending GIFs (10 new ones) from the updated offset
    const trendingContent = await toTrendingView(30, currentOffset);
    q('#container').innerHTML = trendingContent;
  } catch (error) {
    throw new Error('Failed to redirect to trending view: ' + error.message);
  }
};
