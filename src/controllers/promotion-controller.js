import promotionService from '../Services/promotion-service.js';

const promotionController = {
    getAll: async function (req, res) {
        try {
            const result = await promotionService.getAll();
            res.status(200).json({ message: 'Promoções listadas', data: result });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro ao buscar promoções' });
        }
    },

    getOne: async function (req, res) {
        try {
            const result = await promotionService.getOne(req.params.id);
            res.status(200).json({ data: result });
        } catch (err) {
            res.status(404).json({ message: "Erro ao buscar promoção" });
        }
    },

    create: async function (req, res) {
        try {
            const { discountPercentage, targetProductCode } = req.body;
            
            if (!discountPercentage || !targetProductCode) {
                return res.status(400).json({ message: "Selecione o produto e a porcentagem." });
            }

            const result = await promotionService.create(req.body);
            res.status(201).json({ message: "Promoção criada!", data: result });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    updateOne: async function (req, res) {
        try {
            const result = await promotionService.update(req.params.id, req.body);
            res.status(200).json({ message: "Atualizado", data: result });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deleteOne: async function (req, res) {
        try {
            await promotionService.delete(req.params.id);
            res.status(200).json({ message: "Removido" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default promotionController;