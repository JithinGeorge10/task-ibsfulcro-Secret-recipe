import express from 'express'
import connectDB from '../backend/config/dbConnnect.js'
import dotenv from 'dotenv';
import ingredientRoutes from './routes/routes.js';
import morgan from 'morgan'
import cors from 'cors'
dotenv.config();
const app = express()
connectDB()
app.use(morgan('dev'))
app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['https://task-ibsfulcro-secret-recipe.vercel.app'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
  

app.use('/api', ingredientRoutes);

app.listen(3000, () => {
    console.log('started');
})