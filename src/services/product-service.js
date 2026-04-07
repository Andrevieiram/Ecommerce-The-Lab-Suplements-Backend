import productModel from '../models/product-model.js';
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcryptjs';

const productService = {
    create: async function (productData) {

        // Verifica se o produto já está cadastrado
        const existingProduct = await productModel.findOne({ code: productData.code });
        if (existingProduct) {
            throw new Error("Produto já cadastrado com este código");
        }

        const newProduct = {
            name: productData.name,
            code: productData.code,
            price: productData.price,
            stock: productData.stock,
            category: productData.category
        };

        // Salva o novo Produto no banco de dados
        const result = await productModel.create(newProduct);
        const productResponse = result.toObject();

        return productResponse;
    },

    getAll: async function () {
        // Busca todos os produtos 
        const products = await productModel.find({});
        return products;
    },

    getOne: async function (code) {
        const existingProduct = await productModel.findOne({ code });
        return existingProduct;
    },

    deleteOne: async function (code) {
        const existingProduct = await productModel.findOne({ code });
        if (!existingProduct) {
            throw new Error("Produto não encontrado");
        }else{
            return await productModel.deleteOne({ code });
        };
    },

    updateOne: async function (code, updateData) {
        // Verifica se o produto existe
        const product = await productModel.findOne({code});

        if (!product) {
            throw new Error("Produto não encontrado");
        }

        const result = await productModel.updateOne({code}, updateData);

        return result;
    }
};
export default productService;