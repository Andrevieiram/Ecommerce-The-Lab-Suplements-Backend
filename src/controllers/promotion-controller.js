import promotionModel from '../models/promotion-model.js';

const promotionController = {
    getAll: async function (req, res) {
        try{
            const result = await promotionModel.find({})
            res.status(200).json({message: 'Promoções encontrados com sucesso', data: result});

        }catch (err){
            res.status(500).json({message: 'Não foi possível encontrar os Promoções'});
        }
    },
    getOne: async function (req, res) {
        try{
            if (!req.params.code){
                res.status(400).json({message: "O código da promoção é obrigatório"});
            }
            const result = await promotionModel.findOne({code: req.params.code});
            const promotion = result.toObject();
            res.status(200).json({message: "Promoção encontrado com sucesso", data:promotion});
        }catch (err){
            res.status(500).json({message: "Não foi possível encontrar a promoção"});
        }
    },
    deleteOne: async function (req, res) {
        try{
            if (!req.params.code){
                res.status(400).json({message: "O código da promoção é obrigatório"});
            }
            const result = await promotionModel.deleteOne({code: req.params.code});
            res.status(200).json({message: "Promoção deletada com sucesso"});
        }catch (err){
            res.status(500).json({message: "Não foi possível encontrar a promoção"});
        }
    },
    updateOne: function (req, res) {
        
    },
    create: async function (req, res) {
        try{
            if(req.body.code == null || req.body.name == null || req.body.price == null || req.body.stock == null || req.body.category == null){
                res.status(400).json({message: "Os campos obrigatórios não foram preenchidos"});
            }
            const promotion = req.body;
            const result = await promotionModel.create(promotion);
            res.status(201).json({message: "Promoção criada com sucesso", data: result});
        }catch (err){
            res.status(500).json({message: "Não foi possível criar a promoção"});
        }

    },
    login: function (req, res) {
        
    }
}

export default promotionController;