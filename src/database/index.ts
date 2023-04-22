import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const enviroment = process.env.NODE_ENV;
const dev_db_url = process.env.DEVELOPMENT_DB as string;
const prod_db_url = process.env.PRODUCTION_DB as string;;
const test_db_url = process.env.TEST_DB as string;
const connectionUrl = (enviroment=='dev') ? dev_db_url : (enviroment == 'prod') ? prod_db_url : test_db_url;
console.log("env: "+enviroment+"  ---- url: "+connectionUrl)
const app = express();
app.use(express.json());
//CONNECT TO MONGODB
  mongoose.connect(connectionUrl, {
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  })