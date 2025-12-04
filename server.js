import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // 1. Importar o módulo CORS

import userRouter from './src/routers/user-router.js';
import productRouter from './src/routers/product-router.js';
import promotionRouter from './src/routers/promotion-router.js';

dotenv.config();
const app = express();

app.use(cors()); 

app.use(express.json());
mongoose.connect(process.env.MONGO_URL);

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/promotion',promotionRouter);

app.listen(process.env.PORT, () => {
    console.log(`Seu servidor está rodando na porta ${process.env.PORT}`)
});