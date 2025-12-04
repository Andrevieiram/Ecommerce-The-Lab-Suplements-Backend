import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
  discount: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  status: { type: String, enum: ['Ativa', 'Inativa'], default: 'Ativa' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const promotionModel = mongoose.model("Promotions", promotionSchema);

export default promotionModel;
