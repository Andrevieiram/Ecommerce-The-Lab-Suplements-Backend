import productModel from '../models/product-model.js';
import promotionModel from '../models/promotion-model.js'; 

const productService = {
    getAll: async function () {
        return await productModel.find({});
    },

    getOne: async function (code) {
        const product = await productModel.findOne({ code: code });
        if (!product) {
            throw new Error("Produto não encontrado");
        }
        return product;
    },

    create: async function (data) {
        const productExists = await productModel.findOne({ code: data.code });
        if (productExists) {
            throw new Error("Já existe um produto com este código");
        }
        return await productModel.create(data);
    },

    update: async function (code, data) {
        const product = await productModel.findOne({ code: code });
        if (!product) {
            throw new Error("Produto não encontrado");
        }
        return await productModel.findOneAndUpdate({ code: code }, data, { new: true });
    },

    delete: async function (code) {
        const product = await productModel.findOne({ code: code });
        if (!product) {
            throw new Error("Produto não encontrado");
        }

        await promotionModel.deleteMany({ targetProductCode: code });

        return await productModel.deleteOne({ code: code });
    }
}

export default productService;