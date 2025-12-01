// TERCEIRA CAMADA

import productModel from '../models/product-model.js';

// Definindo as funções do controller 
const productController = {
    getAll: async function (req, res) {
        try{
            const result = await productModel.find({})
            res.status(200).json({message: 'Produtos encontrados com sucesso', data: result});

        }catch (err){
            res.status(500).json({message: 'Não foi possível encontrar os produtos'});
        }
    },
    getOne: async function (req, res) {
        try{
            if (!req.params.code){
                res.status(400).json({message: "O código do produto é obrigatório"});
            }
            const result = await productModel.findOne({code: req.params.code});
            const product = result.toObject();
            res.status(200).json({message: "Produto encontrado com sucesso", data:product});
        }catch (err){
            res.status(500).json({message: "Não foi possível encontrar o produto"});
        }
    },
    deleteOne: async function (req, res) {
        try{
            if (!req.params.code){
                res.status(400).json({message: "O código do produto é obrigatório"});
            }
            const result = await productModel.deleteOne({code: req.params.code});
            res.status(200).json({message: "Produto deletado com sucesso"});
        }catch (err){
            res.status(500).json({message: "Não foi possível encontrar o produto"});
        }
    },
    updateOne: function (req, res) {
        
    },
    create: async function (req, res) {
        try{
            if(req.body.code == null || req.body.name == null || req.body.price == null || req.body.stock == null || req.body.category == null){
                res.status(400).json({message: "Os campos obrigatórios não foram preenchidos"});
            }
            const product = req.body;
            const result = await productModel.create(product);
            res.status(201).json({message: "Produto criado com sucesso", data: result});
        }catch (err){
            res.status(500).json({message: "Não foi possível criar o produto"});
        }

    },
    login: function (req, res) {
        
    }
}

export default productController;