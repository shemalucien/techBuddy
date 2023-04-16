import express from 'express';
import dotenv from 'dotenv';
import  UserRoutes from './routes/user.routes';
import ImageRoutes from './routes/image.routes';
import VideoRoutes from './routes/video.routes';
dotenv.config();

import "./database";
const PORT=process.env.PORT;
const app = express();
app.use(express.json());
app.use('/user', UserRoutes);
app.use('/image', ImageRoutes);
app.use('/video', VideoRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server listening on port '+PORT);
  });
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "Hello World!" });
})


