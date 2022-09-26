/**
 * Calculates the start and limit of previous page
 * @param {number} recordCount
 * @param {number} start
 * @param {number} limit
 * @returns {object}
 */
const calculatePrevious = (start, limit) => {
  if (start === 0) return null;

  const diffStart = start - limit + 1;
  const prevStart = diffStart < 1 ? 0 : diffStart;
  const prevLimit = limit + (start - limit);
  return { start: prevStart, limit: prevLimit };
};

/**
 * Calculates the start and limit of next page
 * @param {number} recordCount
 * @param {number} start
 * @param {number} limit
 * @returns {object}
 */
const calculateNext = (recordCount, start, limit) => {
  const nextStart = start + limit;

  if (nextStart >= recordCount) return null;
  const diffLimit = nextStart + limit;
  const nextLimit = diffLimit > recordCount ? recordCount - nextStart : limit;
  return { start: nextStart, limit: nextLimit };
};

/**
 * Determines the next start and limit for subsequent query
 * @param {number} recordCount : total number of records matching query
 * @param {number} start : offset of current query
 * @param {number} limit : number of records to be returned of current query
 * @returns {object} pageInfo{ totalCount, previous , next }
 */
exports.createPageInfo = (recordCount, start, limit) => {
  const previous = calculatePrevious(start, limit);
  const next = calculateNext(recordCount, start, limit);
  return { totalCount: recordCount, previous, next };
};
