import userService from '../services/user-service.js';

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
        try {
            const users = await userService.getAll();
            res.status(200).json({ message: "Lista de usuários", data: users });
        } catch (err) {
            res.status(500).json({ message: "Erro ao buscar usuários" });
        }
    },
    

    login: async function (req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email e senha são obrigatórios" });
            }

            const token = await userService.login({ email, password });

            res.status(200).json({ message: "Login realizado com sucesso", token: token });

        } catch (err) {
            if (err.message === "E-mail ou senha inválidos") {
                return res.status(401).json({ message: err.message });
            }
            console.error(err);
            res.status(500).json({ message: "Erro ao realizar login" });
        }
    },

    deleteOne: async function (req, res) {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({ message: "ID do usuário é obrigatório" });
            }

            await userService.delete(id);

            res.status(200).json({ message: "Usuário excluído com sucesso" });

        } catch (err) {
            if (err.message === "Usuário não encontrado") {
                return res.status(404).json({ message: err.message });
            }
            console.error(err);
            res.status(500).json({ message: "Erro ao excluir o usuário" });
        }
    },


    update: async function (req, res) {
        try {
            const id = req.params.id;
            const data = req.body;

            if (!id) {
                return res.status(400).json({ message: "ID obrigatório" });
            }

            const updatedUser = await userService.update(id, data);

            res.status(200).json({ message: "Usuário atualizado com sucesso", data: updatedUser });

        } catch (err) {
            if (err.message === "Usuário não encontrado" || err.message.includes("já está em uso")) {
                return res.status(400).json({ message: err.message });
            }
            console.error(err);
            res.status(500).json({ message: "Erro ao atualizar usuário" });
        }
    },
};

export default userController;