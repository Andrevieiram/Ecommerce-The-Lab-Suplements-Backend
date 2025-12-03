import userModel from '../models/user-model.js';
import bcrypt from 'bcryptjs';

const userService = {
    create: async function (userData) {
        // Verifica se o usuário já existe
        const userExists = await userModel.findOne({ email: userData.email });
        if (userExists) {
            throw new Error("Usuário já cadastrado com este e-mail");
        }

        // Verifica se o CPF já existe
        const existingCpf = await userModel.findOne({ cpf: userData.cpf });
        if (existingCpf) {
            throw new Error("Usuário já cadastrado com este CPF");
        }

        // Criptografando a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Prepara o objeto para salvar
        const newUser = {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            cpf: userData.cpf
        };

        // Salva no banco
        const result = await userModel.create(newUser);

        // Remove a senha do retorno para segurança
        const userResponse = result.toObject();
        delete userResponse.password;

        return userResponse;
    }
}

export default userService;