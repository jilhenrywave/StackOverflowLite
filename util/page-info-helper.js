/**
 * Determines the next start and limit for subsequent query
 * @param {number} recordCount : total number of records matching query
 * @param {number} start : offset of current query
 * @param {number} limit : number of records to be returned of current query
 * @returns {object} pageInfo{ previous , next }
 */
exports.createPageInfo = (recordCount, start, limit) => {
  const pageInfo = { count: recordCount, previous: { start, limit } };
  const nextRecord = start + limit;

  if (nextRecord >= recordCount) return pageInfo;

  if ((nextRecord + limit) > recordCount) {
    pageInfo.next = { start: nextRecord, limit: recordCount - nextRecord };
  } else {
    pageInfo.next = { start: nextRecord, limit };
  }

  return pageInfo;
};
