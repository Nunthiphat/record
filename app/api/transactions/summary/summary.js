import { connectToDatabase } from '../../../lib/mongodb';

export async function GET() {
  const db = await connectToDatabase();
  const collection = db.collection('transactions');

  const income = await collection.aggregate([
    { $match: { type: 'income' } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]).toArray();

  const expense = await collection.aggregate([
    { $match: { type: 'expense' } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]).toArray();

  return new Response(JSON.stringify({
    income: income[0]?.total || 0,
    expense: expense[0]?.total || 0,
  }), { status: 200 });
}
