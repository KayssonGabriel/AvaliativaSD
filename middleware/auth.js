import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export const proteger = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ erro: 'Token não fornecido.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.usuario = payload;
        next();
    } catch {
        return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }
};

export const autorizar = (cargoPermitido) => (req, res, next) => {
    if (!req.usuario || req.usuario.cargo !== cargoPermitido) {
        return res.status(403).json({ erro: 'Acesso negado.' });
    }
    next();
};