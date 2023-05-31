import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoute, { apiProtected } from './routes/api.js';
import authMiddleware from './middlewares/authMiddleware.js';

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/', apiRoute);
app.use('/api/', authMiddleware, apiProtected);

// Mongoose configuration
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port:${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
