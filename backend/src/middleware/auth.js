import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Adiciona os dados do usuário (id, role) à requisição
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Acesso negado, sem token.' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Usuário com permissão '${req.user.role}' não autorizado a acessar esta rota.` });
    }
    next();
  };
};