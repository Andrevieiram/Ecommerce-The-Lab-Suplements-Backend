import mongoose from "mongoose";

const Schema = mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountPercentage: { type: Number, required: true },
    targetProductCode: { type: String, required: true }, 
    status: { type: Boolean, default: true }
});

const promotionModel = mongoose.model("Promotions", Schema);

export default promotionModel;