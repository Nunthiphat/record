import connectToDatabase from "@/libs/mongodb";

export async function POST(req) {
  const { amount, date, type, note } = await req.json();
  const db = await connectToDatabase();
  const collection = db.collection('transactions');

  const result = await collection.insertOne({ amount, date, type, note });
  return new Response(JSON.stringify(result), { status: 201 });
}
