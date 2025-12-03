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
        const existingProduct = await productModel.findOne({ code: code });
        const result = existingProduct.toObject();
        return result;
    },

    deleteOne: async function (code) {
        const product = await productModel.deleteOne({code: code});
        const result = existingProduct.toObject();
        return result;
    },

    updateOne: async function (code, updateData) {
        // Verifica se o produto existe
        const product = await productModel.findOne({code: code});

        if (!product) {
            throw new Error("Produto não encontrado");
        }

        const result = await productModel.updateOne({code: code}, updateData);
        const productResponse = result.toObject();
        delete productResponse._id;
        return productResponse;
    }
};
export default productService;