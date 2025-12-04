import promotionModel from '../models/promotion-model.js';
import productModel from '../models/product-model.js';

const promotionService = {
    generateCode: async function() {
        let code;
        let exists = true;

        // Tenta gerar até achar um que não existe
        while (exists) {
            code = Math.floor(1000 + Math.random() * 9000).toString();
            const promo = await promotionModel.findOne({ code });
            if (!promo) exists = false;
        }
        return code;
    },

    getAll: async function () {
        // Busca todas as promoções
        const promotions = await promotionModel.find({});
        
        const result = await Promise.all(promotions.map(async (promo) => {
            const product = await productModel.findOne({ code: promo.targetProductCode });
            
            let promoObj = promo.toObject();

            if (product) {
                promoObj.productName = product.name;
                promoObj.originalPrice = product.price;
                
                // Calcula o valor com desconto
                const discountValue = product.price * (promo.discountPercentage / 100);
                promoObj.discountedPrice = product.price - discountValue;
            } else {
                promoObj.productName = "Produto não encontrado";
                promoObj.originalPrice = 0;
                promoObj.discountedPrice = 0;
            }

            return promoObj;
        }));

        return result;
    },

    getOne: async function (code) {
        return await promotionModel.findOne({ code: code });
    },

    create: async function (data) {
        const productExists = await productModel.findOne({ code: data.targetProductCode });
        if (!productExists) throw new Error("O produto informado não existe");

        // Gera o código automático de 4 dígitos
        const newCode = await this.generateCode();

        const newPromo = {
            code: newCode,
            discountPercentage: data.discountPercentage,
            targetProductCode: data.targetProductCode
        };

        return await promotionModel.create(newPromo);
    },

    update: async function (code, data) {
        if (data.targetProductCode) {
            const productExists = await productModel.findOne({ code: data.targetProductCode });
            if (!productExists) throw new Error("O produto informado não existe");
        }
        return await promotionModel.findOneAndUpdate({ code: code }, data, { new: true });
    },

    delete: async function (code) {
        return await promotionModel.deleteOne({ code: code });
    }
}

export default promotionService;