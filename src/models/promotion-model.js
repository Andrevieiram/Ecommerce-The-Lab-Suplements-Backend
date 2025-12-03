import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },   
  unit: { type: String, required: true },     
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  newPrice: { type: Number },                           
  status: { type: String, enum: ["Ativa", "Inativa"], default: "Ativa" } 
}, { timestamps: true }); 

const promotionModel = mongoose.model("Promotions", promotionSchema);
export default promotionModel;
