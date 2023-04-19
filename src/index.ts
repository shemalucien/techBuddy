import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import  UserRoutes from './routes/user.routes';
import ImageRoutes from './routes/image.routes';
import VideoRoutes from './routes/video.routes';
import "./database";

import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./config/swagger.json";

dotenv.config();
const PORT=process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/image', ImageRoutes);
app.use('/api/v1/video', VideoRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.listen(process.env.PORT, () => {
    console.log('Server listening on port '+PORT);
  });
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "Hello World!" });
})

export default app;

