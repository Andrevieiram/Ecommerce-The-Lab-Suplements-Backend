import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        // Verifica se o token é válido usando a nossa chave secreta
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);

        // Salva os dados do usuário na requisição para usarmos depois se precisar
        req.user = decoded;

        next();

    } catch (err) {
        res.status(400).json({ message: "Token inválido." });
    }
};

export default authMiddleware;