// TERCEIRA CAMADA

import productModel from '../models/product-model.js';
import productService from '../services/product-service.js';

// Definindo as funções do controller 
const productController = {
    getAll: async function (req, res) {
        try{
            const result = await productService.getAll();
            res.status(200).json({message: 'Produtos encontrados com sucesso', data: result});

        }catch (err){
            res.status(500).json({message: 'Não foi possível encontrar os produtos'});
        }
    },
    getOne: async function (req, res) {
        try{
            if (!req.params.code){
                res.status(400).json({message: "O código do produto é obrigatório"});
                return;
            }
            const result = await productService.getOne(req.params.code);
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
            const result = await productService.deleteOne(req.params.code);
            res.status(200).json({message: "Produto deletado com sucesso"});
        }catch (err){
            res.status(500).json({message: "Não foi possível encontrar o produto"});
        }
    },
    updateOne: async function (req, res) {
        try{
            if (!req.params.code){
                res.status(400).json({message: "O código do produto é obrigatório"});
            }
            const result = await productService.updateOne(req.params.code, req.body);
            res.status(200).json({message: "Produto atualizado com sucesso"  });
        }catch (err){
            res.status(500).json({message: "Não foi possível encontrar o produto"});
        }
    },
    create: async function (req, res) {
        try{
            if(req.body.code == null || req.body.name == null || req.body.price == null || req.body.stock == null || req.body.category == null){
                res.status(400).json({message: "Os campos obrigatórios não foram preenchidos"});
            }
            const product = req.body;
            const result = await productService.create(product);
            res.status(201).json({message: "Produto criado com sucesso", data: result});
        }catch (err){
            res.status(500).json({message: "Não foi possível criar o produto"});
        }

    }
}

export default productController;