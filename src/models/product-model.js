// QUARTA CAMADA

import mongoose from "mongoose";
const Schema = mongoose.Schema({
    name: {type: String, required: true},
    code: {type: Number, required: true, unique: true},
    description: {type: String},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    status: {type: Boolean, required: true, default: true}
})

const productModel = mongoose.model("Products", Schema);
export default productModel;