import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRouter from  './src/routers/user-router.js';
import productRouter from  './src/routers/product-router.js';
import promotionRouter from  './src/routers/promotion-router.js';

dotenv.config();
const app = express();

app.use(express.json());

// Conecta ao MongoDB usando a variável 'URL' definida no seu .env 
mongoose.connect(process.env.URL)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
    
    // Definindo rotas para o servidor e suas respectivas responsabilidades
    // Estas rotas SÓ serão carregadas se a conexão for bem-sucedida
    app.use('/api/users', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/promotion', promotionRouter);

    // Colocando o servidor para ser escutado APENAS após a conexão com o DB
    app.listen(process.env.PORT, () => {
      console.log(`Seu servidor está rodando na porta ${process.env.PORT}`);
    });
  })
  .catch(err => {
    // Trata falha na conexão com o banco de dados
    console.error('Erro de conexão ao MongoDB. O servidor não será iniciado:', err.message);
    // Encerra o processo se a conexão falhar, já que o banco é essencial
    process.exit(1); 
  });