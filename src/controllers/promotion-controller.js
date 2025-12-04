import promotionModel from '../models/promotion-model.js';
import productModel from '../models/product-model.js';

const promotionController = {
  getAll: async (req, res) => {
    try {
      const promotions = await promotionModel.find().populate('product');
      res.status(200).json({ message: 'Promoções encontradas com sucesso', data: promotions });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Não foi possível encontrar as promoções' });
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'ID da promoção é obrigatório' });

      const promotion = await promotionModel.findById(id).populate('product');
      if (!promotion) return res.status(404).json({ message: 'Promoção não encontrada' });

      res.status(200).json({ message: 'Promoção encontrada com sucesso', data: promotion });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Não foi possível encontrar a promoção' });
    }
  },

  create: async (req, res) => {
    try {
      const { productId, discount, status } = req.body;
      if (!productId || discount == null) {
        return res.status(400).json({ message: 'Produto e desconto são obrigatórios' });
      }

      const product = await productModel.findById(productId);
      if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

      const newPrice = product.price - (product.price * discount / 100);

      const promotion = await promotionModel.create({
        product: product._id,
        discount,
        newPrice,
        status: status || 'Ativa'
      });

      res.status(201).json({ message: 'Promoção criada com sucesso', data: promotion });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Não foi possível criar a promoção' });
    }
  },

  updateOne: async (req, res) => {
    try {
      const { id } = req.params;
      const { discount, status } = req.body;
      if (!id) return res.status(400).json({ message: 'ID da promoção é obrigatório' });

      const promotion = await promotionModel.findById(id);
      if (!promotion) return res.status(404).json({ message: 'Promoção não encontrada' });

      if (discount != null) {
        const product = await productModel.findById(promotion.product);
        promotion.discount = discount;
        promotion.newPrice = product.price - (product.price * discount / 100);
      }

      if (status) promotion.status = status;

      await promotion.save();

      res.status(200).json({ message: 'Promoção atualizada com sucesso', data: promotion });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Não foi possível atualizar a promoção' });
    }
  },

  deleteOne: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'ID da promoção é obrigatório' });

      const result = await promotionModel.findByIdAndDelete(id);
      if (!result) return res.status(404).json({ message: 'Promoção não encontrada' });

      res.status(200).json({ message: 'Promoção deletada com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Não foi possível deletar a promoção' });
    }
  }
};

export default promotionController;
