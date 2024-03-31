import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {

  mongoose.set('strictQuery', true);

  if (connected) {

    console.log('MongoDB is already connected');
    return connected;
  }

  try {

    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log('MongoDB connected');

  } catch (e) {
    connected = false;
    console.log('ERROR: ', e);
  }

  return connected;
}

export default connectDB;