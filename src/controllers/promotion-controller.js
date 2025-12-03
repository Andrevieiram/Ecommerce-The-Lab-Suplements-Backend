import promotionModel from '../models/promotion-model.js';

const promotionController = {
  getAll: async (req, res) => {
    try {
      const result = await promotionModel.find({});
      res.status(200).json({ message: 'Promoções encontradas com sucesso', data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Não foi possível encontrar as promoções' });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ message: "O ID da promoção é obrigatório" });

      const result = await promotionModel.findById(id);
      if (!result) return res.status(404).json({ message: "Promoção não encontrada" });

      res.status(200).json({ message: "Promoção encontrada com sucesso", data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Não foi possível encontrar a promoção" });
    }
  },

   deleteOne: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ message: "O ID da promoção é obrigatório" });

      const result = await promotionModel.findByIdAndDelete(id);
      if (!result) return res.status(404).json({ message: "Promoção não encontrada" });

      res.status(200).json({ message: "Promoção deletada com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Não foi possível deletar a promoção" });
    }
  },

  updateOne: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ message: "O ID da promoção é obrigatório" });

      const updated = await promotionModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: "Promoção não encontrada" });

      res.status(200).json({ message: "Promoção atualizada com sucesso", data: updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Não foi possível atualizar a promoção" });
    }
  },

  create: async (req, res) => {
    try {
      const { code, name, category, stock, unit, price, discount, status } = req.body;
      if (!code || !name || !category || !stock || !unit || !price)
        return res.status(400).json({ message: "Os campos obrigatórios não foram preenchidos" });

      const newPrice = discount ? price - (price * discount / 100) : price;

      const promotion = {
        code,
        name,
        category,
        stock,
        unit,
        price,
        discount: discount || 0,
        newPrice,
        status: status || "Ativa"
      };

      const result = await promotionModel.create(promotion);
      res.status(201).json({ message: "Promoção criada com sucesso", data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Não foi possível criar a promoção" });
    }
  }
};

export default promotionController;
