const fetchCheckoutSessions = require('../utils/fetchCheckoutSessions');

// Helper: get UNIX timestamps for past X days
function getTimeRange(days) {
  const now = Math.floor(Date.now() / 1000);
  const from = now - (days * 24 * 60 * 60);
  return { from, to: now };
}

// Reusable report generator
async function generateSalesReport(from, to) {
  const sessions = await fetchCheckoutSessions(from, to);
  const dataByDate = {};
  let totalSales = 0;
  let totalSubscriptions = 0;

  for (const session of sessions) {
    if (session.payment_status !== 'paid') continue;

    const date = new Date(session.created * 1000).toISOString().split('T')[0];
    if (!dataByDate[date]) {
      dataByDate[date] = { date, total: 0, subscriptions: 0 };
    }

    const amount = session.amount_total / 100;
    dataByDate[date].total += amount;
    dataByDate[date].subscriptions += 1;

    totalSales += amount;
    totalSubscriptions += 1;
  }

  // Round amounts
  Object.values(dataByDate).forEach(item => {
    item.total = parseFloat(item.total.toFixed(2));
  });

  return {
    chartData: Object.values(dataByDate),
    totalSales: parseFloat(totalSales.toFixed(2)),
    totalSubscriptions,
  };
}

// Controller: Last 7 days sales
exports.getLast7DaysSales = async (req, res) => {
  try {
    const { from, to } = getTimeRange(6);
    const result = await generateSalesReport(from, to);
    res.json(result);
  } catch (error) {
    console.error('7 days sales fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch 7 days sales data.' });
  }
};

// Controller: Last 30 days sales
exports.getLast30DaysSales = async (req, res) => {
  try {
    const { from, to } = getTimeRange(30);
    const result = await generateSalesReport(from, to);
    res.json(result);
  } catch (error) {
    console.error('30 days sales fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch 30 days sales data.' });
  }
};

// Controller: Last 90 days (3 months) sales
exports.getLast3MonthsSales = async (req, res) => {
  try {
    const { from, to } = getTimeRange(90);
    const result = await generateSalesReport(from, to);
    res.json(result);
  } catch (error) {
    console.error('90 days sales fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch 3 months sales data.' });
  }
};
