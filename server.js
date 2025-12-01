// PRIMEIRA CAMADA

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Importando os routers respectivos de cada recurso
import userRouter from  './src/routers/user-router.js';
import productRouter from  './src/routers/product-router.js';
import promotionRouter from  './src/routers/promotion-router.js';

// Configurando bibliotecas (parte necessária para o funcionamento do servidor)
dotenv.config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URL);

// Definindo rotas para o servidor e suas respectivas responsabilidades
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/promotion',promotionRouter);

// Colocando o servidor para ser escutado na porta 3000
app.listen(process.env.PORT, () => {
    console.log(`Seu servidor está rodando na porta ${process.env.PORT}`)
});