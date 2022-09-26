const pageInfoWithoutPrevious = {
  input: { recordCount: 10, start: 0, limit: 5 },
  output: {
    totalCount: 10,
    previous: null,
    next: { start: 5, limit: 5 },
  },
};

const pageInfoWithPrevious = {
  input: { recordCount: 20, start: 4, limit: 6 },
  output: {
    totalCount: 20,
    previous: { start: 0, limit: 4 },
    next: { start: 10, limit: 6 },
  },
};

const pageInfoWithNext = {
  input: { recordCount: 15, start: 4, limit: 4 },
  output: {
    totalCount: 15,
    previous: { start: 1, limit: 4 },
    next: { start: 8, limit: 4 },
  },
};

const pageInfoWithOutNext = {
  input: { recordCount: 5, start: 2, limit: 3 },
  output: {
    totalCount: 5,
    previous: { start: 0, limit: 2 },
    next: null,
  },
};

module.exports = {
  pageInfoWithPrevious,
  pageInfoWithoutPrevious,
  pageInfoWithNext,
  pageInfoWithOutNext,
};
