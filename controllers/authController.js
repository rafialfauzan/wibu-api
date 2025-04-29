const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
};

exports.register = async (req, res) => {
  const { username, nama, password } = req.body;
  try {
    const anggota = await db.Anggota.create({ username, nama, password });
    res.json({ message: 'Register berhasil', anggota });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const anggota = await db.Anggota.findOne({ where: { username } });

    if (!anggota) {
      return res.status(404).json({ message: 'Anggota tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(password, anggota.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Kredensial salah' });
    }

    const accessToken = generateAccessToken(anggota);

    // Simpan accessToken ke database
    anggota.accessToken = accessToken;
    await anggota.save();

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.status(400).json({ message: 'Token tidak ditemukan' });
  
    try {
      const anggota = await db.Anggota.findOne({ where: { accessToken: token } });
  
      if (!anggota) {
        return res.status(404).json({ message: 'Token tidak valid' });
      }
  
      // Hapus accessToken dari database
      anggota.accessToken = null;
      await anggota.save();
  
      res.status(200).json({ message: 'Logout berhasil' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
    
exports.getCurrentUser = (req, res) => {
  const { id, username, nama } = req.user;
  res.json({ id, username, nama }); 
};

// Endpoint untuk refresh token
exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;
  
    if (!refreshToken) return res.status(401).json({ message: 'Refresh Token tidak ditemukan' });
  
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Refresh Token tidak valid' });
  
      const accessToken = generateAccessToken({ id: decoded.id });
      res.json({ accessToken });
    });
};