const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/enquiry'; // Replace with your MongoDB URI




const connectDB = async () => {
  try {
    await mongoose.connect(  dbURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
}

exports.connectDB = connectDB;