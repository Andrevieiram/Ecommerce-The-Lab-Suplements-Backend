import express from 'express';
import dotenv from 'dotenv';
import userRouter from  './src/routers/user-router.js';
import productRouter from  './src/routers/product-router.js';
import promotionRouter from  './src/routers/promotion-router.js';
dotenv.config();
const app = express();
app.use(express.json());

// Definindo rotas para o servidor e suas respectivas responsabilidades
app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/promotion',promotionRouter)

app.listen(process.env.PORT, () => {
    console.log(`Seu servidor está rodando na porta ${process.env.PORT}`)
})