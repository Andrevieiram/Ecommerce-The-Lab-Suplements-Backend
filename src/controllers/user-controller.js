import userService from '../Services/user-service.js';

const userController = {
    create: async function (req, res) {
        try {
            const { name, email, password, cpf } = req.body;

            if (!name || !email || !password || !cpf) {
                return res.status(400).json({ message: "Os campos nome, email, senha e cpf são obrigatórios" });
            }

            const userResponse = await userService.create(req.body);

            res.status(201).json({ message: "Usuário criado com sucesso", data: userResponse });

        } catch (err) {
            if (err.message === "Usuário já cadastrado com este e-mail" || err.message === "Usuário já cadastrado com este CPF") {
                return res.status(400).json({ message: err.message });
            }
            
            console.error(err);
            res.status(500).json({ message: "Não foi possível criar o usuário" });
        }
    },
    
    getAll: async function (req, res) {
    },
    login: async function (req, res) {
    }
};

export default userController;