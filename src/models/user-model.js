import mongoose from "mongoose";

const Schema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    cpf: { type: String, required: true, unique: true }
});

const userModel = mongoose.model("Users", Schema);
export default userModel;