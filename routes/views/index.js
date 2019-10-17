const
  express = require('express'),
  httpStatusCodes = require('../../utilities/constants/http-status-codes'),
  queries = require('../../db/queries');

const router = express.Router();

router.route('/')
  .get((request, response) => {
    const { eventId } = request.query;

    if (!eventId) {
      return response.sendStatus(httpStatusCodes.badRequest);
    }

    return queries.views.getViews(eventId)
      .then((result) => {
        const { rows } = result;

        return response.status(httpStatusCodes.ok).send(rows);
      })
      .catch((error) => {
        return queries.errors.logError(error.name, error.message, error.stack);
      });
  });

module.exports = router;