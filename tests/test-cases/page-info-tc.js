const { link } = require('./test-constants');

const pageInfoWithoutPrevious = {
  input: { recordCount: 10, page: 1, limit: 5, link: `${link}?limit=${5}` },
  output: {
    totalCount: 10,
    previous: undefined,
    next: `${link}?limit=${5}&page=${2}`,
  },
};

const pageInfoWithPrevious = {
  input: { recordCount: 20, page: 2, limit: 6, link: `${link}?limit=${6}` },
  output: {
    totalCount: 20,
    previous: `${link}?limit=${6}&page=${1}`,
    next: `${link}?limit=${6}&page=${3}`,
  },
};

const pageInfoWithNext = {
  input: { recordCount: 15, page: 3, limit: 4, link: `${link}?limit=${4}` },
  output: {
    totalCount: 15,
    previous: `${link}?limit=${4}&page=${2}`,
    next: `${link}?limit=${4}&page=${4}`,
  },
};

const pageInfoWithOutNext = {
  input: { recordCount: 5, page: 2, limit: 3, link: `${link}?limit=${3}` },
  output: {
    totalCount: 5,
    previous: `${link}?limit=${3}&page=${1}`,
    next: undefined,
  },
};

module.exports = {
  pageInfoWithPrevious,
  pageInfoWithoutPrevious,
  pageInfoWithNext,
  pageInfoWithOutNext,
};
