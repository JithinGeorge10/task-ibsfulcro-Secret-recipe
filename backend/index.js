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

const cors = require('cors');

app.use(cors({
  origin: 'https://task-ibsfulcro-secret-recipe.vercel.app', // no trailing slash
  credentials: true, // if you need cookies or auth
}));
  

app.use('/api', ingredientRoutes);

app.listen(3000, () => {
    console.log('started');
})