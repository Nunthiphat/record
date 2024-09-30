import connectToDatabase from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';

export async function GET() {
  try {
    const db = await connectToDatabase();
    
    const transactions = await Transaction.find({});

    return new Response(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return new Response(JSON.stringify({ error: 'Error fetching transactions' }), { status: 500 });
  }
}
