import mongoose from 'mongoose';
import config from '../config';

let isConnected = false;
let connectionPromise: Promise<typeof mongoose> | null = null;

const connectDatabase = async () => {
   if (isConnected) {
      return mongoose;
   }

   if (!connectionPromise) {
      connectionPromise = mongoose.connect(config.database_url as string);
   }

   await connectionPromise;
   isConnected = true;
   return mongoose;
};

export default connectDatabase;
