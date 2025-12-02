import userModel from '../models/user-model.js';

const userController = {
    // Recuperar Todos os Usuários 
    // GET /api/users
    getAll: async function (req, res) {
        try {
            const users = await userModel.find(); 
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Recuperar Usuário por ID
    // GET /api/users/:id
    getOne: async function (req, res) {
        try {
            const user = await userModel.findById(req.params.id);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Cadastrar Novo Usuário 
    // POST /api/users
    create: async function (req, res) {
        try {
            const newUser = new userModel(req.body);
            const savedUser = await newUser.save(); 
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    // Atualizar Usuário por ID 
    // PUT /api/users/:id
    updateOne: async function (req, res) {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                {  new: true, runValidators: true } 
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Remover Usuário por ID
    // DELETE /api/users/:id
    deleteOne: async function (req, res) {
        try {
            const result = await userModel.findByIdAndDelete(req.params.id);

            if (!result) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.status(204).send(); 
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}

export default userController;