const jwt = require('jsonwebtoken');
const db = require('../models');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token tidak ditemukan'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const anggota = await db.Anggota.findByPk(decoded.id);

        if (!anggota || anggota.accessToken !== token) {
            return res.status(403).json({ message: 'Token tidak valid'});
        }

        req.user = anggota;
        next();
    } catch {
        res.status(403).json({ message: 'Token tidak valid'});
    }
};

module.exports = authenticate;