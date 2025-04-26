import mongoose from 'mongoose';

const connectDB = () => {
  return mongoose.connect(process.env.MONGOURL)
    .then(() => console.log('MongoDB Connected!'))
    .catch((error) => console.log(error));
};

export default connectDB;
