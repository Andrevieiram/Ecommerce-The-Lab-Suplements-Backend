// models/user-model.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório']
  },
  cpf: {
    type: String,
    required: [true, 'O CPF é obrigatório'],
    unique: true, 
    maxlength: 11 
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório'],
    unique: true, 
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    minlength: 6 
  }
}, {
  timestamps: true 
});

// Middleware do Mongoose: Hashea a senha antes de salvar (apenas se for nova ou modificada)
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Passa o erro para o Express
  }
});

// Método para comparar a senha na hora do login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const userModel = mongoose.model('User', UserSchema);

export default userModel;