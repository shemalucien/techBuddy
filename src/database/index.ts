import express from 'express';
import mongoose from 'mongoose';
const MONGO_URI=process.env.MONGO_URI as string;
const app = express();
app.use(express.json());
//CONNECT TO MONGODB
  mongoose.connect(MONGO_URI, {
  }).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  })