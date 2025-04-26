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
    origin: process.env.FRONTEND || '*',
    methods:['GET','POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
})) 

app.use('/api', ingredientRoutes);

app.listen(3000, () => {
    console.log('started');
})