/**
 * Formats request link with updated page and limit query field
 * @param {string} field
 * @param {string} value
 * @param {string} link
 * @returns {string}
 */
const updateLink = (field, value, link) => {
  const url = new URL(decodeURIComponent(link));

  const searchParam = url.searchParams;

  searchParam.set(field, value);

  url.search = searchParam.toString();

  return url.toString();
};
/**
 * Calculates the page and limit of previous page
 * @param {number} recordCount
 * @param {number} page
 * @param {number} limit
 * @returns {object}
 */
const calculatePrevious = (page, link) => {
  const prevPage = page - 1;
  if (prevPage <= 0) return undefined;

  const updatedPage = updateLink('page', prevPage, link);

  return updatedPage;
};

/**
 * Calculates the page and limit of next page
 * @param {number} recordCount
 * @param {number} page
 * @param {number} limit
 * @returns {object}
 */
const calculateNext = (recordCount, page, limit, link) => {
  const nextPage = page + 1;
  const offset = (page - 1) * limit;

  if (offset + limit >= recordCount || limit >= recordCount) return undefined;

  const updatedPage = updateLink('page', nextPage, link);

  return updatedPage;
};

/**
 * Determines the next page and limit for subsequent query
 * @param {number} recordCount : total number of records matching query
 * @param {number} page : offset of current query
 * @param {number} limit : number of records to be returned of current query
 * @returns {object} pageInfo{ totalCount, previous , next }
 */
exports.createPageInfo = (recordCount, page, limit, link) => {
  if (!link) return undefined;

  const previous = calculatePrevious(page, link);
  const next = calculateNext(recordCount, page, limit, link);

  return { totalCount: recordCount, previous, next };
};
