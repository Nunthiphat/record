import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let dbCache;

async function connectToDatabase() {
  if (dbCache) return dbCache;
  try {
      const uri = MONGODB_URI;
      const options= {
          dbName: 'transactions',
          serverApi: { version: '1', strict: true, deprecationErrors: true }
      };
      await mongoose.connect(uri, options);
      dbCache = mongoose.connection;
      console.log('Connected to MongoDB');
      return dbCache;
  }catch(err){
      console.error('Failed to connect to MongoDB', err);
      throw err;
  }
}

export default connectToDatabase;
