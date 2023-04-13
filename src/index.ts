import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import "./database";
const PORT=process.env.PORT;

const app = express();
app.use(express.json());



// Start the server
app.listen(process.env.PORT, () => {
    console.log('Server listening on port '+PORT);
  });


