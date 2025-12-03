import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; 

import userRouter from './src/routers/user-router.js';
import productRouter from './src/routers/product-router.js';
import promotionRouter from './src/routers/promotion-router.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors()); 

mongoose.connect(process.env.URL)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
    
    app.use('/api/users', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/promotion', promotionRouter);

    app.listen(process.env.PORT, () => {
      console.log(`Seu servidor está rodando na porta ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro de conexão ao MongoDB:', err.message);
    process.exit(1); 
  });