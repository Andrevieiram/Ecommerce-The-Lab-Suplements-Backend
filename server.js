const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/user:name',  async (req,res) => {
    const response = await getUserByName(req.params.name)

    if (response.error){
        return res.status(500).json({data: 'Não foi  possível listar os usuários '})
    } else if (response.notFound){
        return res.status(404).json({data: 'Usuário não encontrado'})
    } else {
        return res.status(200).json({data: response.user})
    }
})

app.get('/api/product', (req,res) => {
    
})

app.get('/api/promotion', (req,res) => {
    
})

app.post('/api/user', (req,res) => {

})

app.post('/api/product', (req,res) => {
    
})

app.post('/api/promotion', (req,res) => {
    
})


app.listen(process.env.PORT, () => {
    console.log(`Seu servidor está rodando na porta ${process.env.PORT}`)
})