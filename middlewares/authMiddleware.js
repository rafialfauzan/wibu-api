const jwt = require('jsonwebtoken');
const db = require('../models');

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Cari user berdasarkan token yang ada di database
    const anggota = await db.Anggota.findOne({ where: { id: payload.id, accessToken: token } });

    if (!anggota) {
      return res.status(401).json({ message: 'Token tidak valid atau sudah logout' });
    }

    req.user = anggota;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalid atau expired' });
  }
};