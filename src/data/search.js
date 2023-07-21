/**
 * Object representing search and pagination information.
 * @property {Object} search - Contains information related to the search query and pagination.
 * @property {string} search.term - The search term being used for the query.
 * @property {number} search.page - The current page number being displayed.
 * @property {number} search.totalPages - The total number of pages available for the search results.
 */
export const searchPagination = {
  search: {
    term: '', // The search term
    page: 1, // The current page number
    totalPages: 2, // The total number of pages
  },
};
