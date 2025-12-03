import userModel from '../models/user-model.js';
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcryptjs';

const userService = {
    create: async function (userData) {

        // Verifica se o e-mail ou CPF já estão cadastrados
        const existingEmail = await userModel.findOne({ email: userData.email });
        if (existingEmail) {
            throw new Error("Usuário já cadastrado com este e-mail");
        }

        const existingCpf = await userModel.findOne({ cpf: userData.cpf });
        if (existingCpf) {
            throw new Error("Usuário já cadastrado com este CPF");
        }

        // Criptografa a senha antes de salvar
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const newUser = {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            cpf: userData.cpf
        };

        // Salva o novo usuário no banco de dados
        const result = await userModel.create(newUser);
        const userResponse = result.toObject();
        delete userResponse.password;

        return userResponse;
    },

    login: async function (loginData) {
        const user = await userModel.findOne({ email: loginData.email });
        
        // Verifica se o usuário existe
        if (!user) {
            throw new Error("E-mail ou senha inválidos");
        }

        // Compara a senha enviada com a senha criptografada no banco
        const isPasswordMatch = await bcrypt.compare(loginData.password, user.password);

        if (!isPasswordMatch) {
            throw new Error("E-mail ou senha inválidos");
        }

        
        const token = jwt.sign({ id: user._id, email: user.email }, 
            process.env.JWT_SECRET, { expiresIn: '1d' });

        return token;
    }
}

export default userService;