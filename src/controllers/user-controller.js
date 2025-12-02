import userModel from '../models/user-model.js';
import bcrypt from 'bcryptjs'; 
import generateToken from '../utils/generateToken.js'; // NOVO IMPORT

const userController = {
    // Recuperar Todos os Usuários (READ)
    // GET /api/users
    getAll: async function (req, res) {
        try {
            // .select('-password') omite o campo password por segurança
            const users = await userModel.find().select('-password'); 
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
        }
    },

    // Recuperar Usuário por ID (READ)
    // GET /api/users/:id
    getOne: async function (req, res) {
        try {
            // .select('-password') omite o campo password por segurança
            const user = await userModel.findById(req.params.id).select('-password');

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: 'ID inválido ou erro de servidor.', error: error.message });
        }
    },

    // Cadastrar Novo Usuário (CREATE)
    // POST /api/users
    create: async function (req, res) {
        try {
            const newUser = new userModel(req.body);
            // O middleware pre('save') no model hashea a senha
            const savedUser = await newUser.save(); 
            
            // Cria um novo objeto para remover a senha antes de enviar a resposta
            const { password, ...userWithoutPassword } = savedUser.toObject();
            
            res.status(201).json({ 
                message: 'Usuário cadastrado com sucesso!',
                user: userWithoutPassword 
            });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({ message: 'Email ou CPF já cadastrado.' });
            }
            res.status(400).json({ message: 'Erro de validação ao cadastrar usuário.', error: error.message });
        }
    },
    
    // Atualizar Usuário por ID (UPDATE)
    // PUT /api/users/:id
    updateOne: async function (req, res) {
        try {
            const updateData = req.body;
            
            // CORREÇÃO DE SEGURANÇA: Hashear a senha se ela estiver sendo atualizada
            if (updateData.password) {
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(updateData.password, salt);
            }
            
            const updatedUser = await userModel.findByIdAndUpdate(
                req.params.id,
                updateData,
                {  
                    new: true, // Retorna o documento atualizado
                    runValidators: true // Garante que as regras do Schema sejam aplicadas
                } 
            ).select('-password'); // Omitir a senha no retorno

            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.status(200).json({
                message: 'Usuário atualizado com sucesso!',
                user: updatedUser
            });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar usuário.', error: error.message });
        }
    },

    // Remover Usuário por ID (DELETE)
    // DELETE /api/users/:id
    deleteOne: async function (req, res) {
        try {
            const result = await userModel.findByIdAndDelete(req.params.id);

            if (!result) {
                return res.status(404).json({ message: 'Usuário não encontrado para remoção' });
            }

            // Status 204 significa 'No Content'
            res.status(204).send(); 
        } catch (error) {
            res.status(500).json({ message: 'Erro ao remover usuário.', error: error.message });
        }
    },

    // Login de Usuário (JWT IMPLEMENTADO)
    // POST /api/users/login
    login: async function (req, res) {
        const { email, password } = req.body;
        
        try {
            // 1. Encontrar o usuário e forçar o retorno da senha (+password) para comparação
            const user = await userModel.findOne({ email }).select('+password'); 

            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            // 2. Comparar a senha fornecida com o hash salvo
            const isMatch = await user.matchPassword(password);

            if (isMatch) {
                const token = generateToken(user._id);

                // Cria um novo objeto para remover a senha antes de enviar a resposta
                const { password, ...userWithoutPassword } = user.toObject();

                return res.status(200).json({
                    message: 'Login bem-sucedido! Use este token para acessar rotas protegidas.',
                    user: userWithoutPassword,
                    token: token 
                });
            } else {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Erro no processo de login.', error: error.message });
        }
    }
}

export default userController;