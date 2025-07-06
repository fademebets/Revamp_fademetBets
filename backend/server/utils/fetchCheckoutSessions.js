const stripe = require('../config/stripe');

// Fetch Checkout Sessions within a date range
async function fetchCheckoutSessions(from, to) {
  let sessions = [];
  let hasMore = true;
  let startingAfter = null;

  while (hasMore) {
    const params = {
      limit: 100,
      created: { gte: from, lte: to },
      expand: ['data.payment_intent'],
    };
    if (startingAfter) params.starting_after = startingAfter;

    const response = await stripe.checkout.sessions.list(params);

    sessions = sessions.concat(response.data);
    hasMore = response.has_more;

    if (hasMore) {
      startingAfter = response.data[response.data.length - 1].id;
    }
  }

  return sessions;
}

module.exports = fetchCheckoutSessions;
