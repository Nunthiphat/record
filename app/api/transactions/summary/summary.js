import connectToDatabase from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';

export async function GET() {
  try {
    const db = await connectToDatabase();

    const income = await Transaction.aggregate([
      { $match: { type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const expense = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    return new Response(JSON.stringify({
      income: income[0]?.total || 0,
      expense: expense[0]?.total || 0,
    }), { status: 200 });
  } catch (error) {
    console.error('Error fetching summary:', error);
    return new Response(JSON.stringify({ error: 'Error fetching summary' }), { status: 500 });
  }
}
