import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';

const PORT=process.env.PORT;
const MONGO_URI="mongodb+srv://shemalucien:Shema123@cluster0.auv9tls.mongodb.net/Portfolio_dev?retryWrites=true&w=majority";
const NODE_ENV = process.env.NODE_ENV || '';

const app = express();
app.use(express.json());
//CREATE CONFIG OBJECT
const config = {
  mongo: {
      url: MONGO_URI,
  },
  server: {
      port: PORT,
  },
};
//CHECK FOR ENVIRONMENT
if (NODE_ENV === 'production') {
  config.mongo.url = MONGO_URI;
  config.server.port = PORT;
} else if (NODE_ENV === 'local') {
  config.mongo.url = MONGO_URI;
  config.server.port = PORT;
}


//CONNECT TO MONGODB
  mongoose.connect(config.mongo.url, {
  }).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  })