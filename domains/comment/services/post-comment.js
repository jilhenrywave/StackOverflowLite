const { Comment } = require('../../../db/model-handler');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

const postComment = async ({ commentBody = '', paramId = '', user }) => {
  try {
    if (!commentBody || !paramId) throw new Error();

    const query = new QueryBuilder()
      .setModel(Comment)
      .build();

    const comment = await query.execCreate({
      body: commentBody,
      ownerId: user.id,
      answerId: paramId,
    });

    if (!comment) throw new Error();

    const { id, body, answerId } = comment;

    return { id, body, answerId, owner: { id: user.id, name: user.name } };
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = postComment;
