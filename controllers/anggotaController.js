const db = require('../models');

exports.createAnggota = async (req, res) => {
  const { username } = req.body;
  const { nama } = req.body;
  const { password } = req.body; 
  try {
    const anggota = await db.Anggota.create({ username, nama, password });
    res.json(anggota);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAnggota = async (req, res) => {
  try {
    const anggota = await db.Anggota.findAll();
    res.json(anggota);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnggota = async (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;
  try {
    await db.Anggota.update({ nama }, { where: { id } });
    res.json({ message: 'Anggota updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAnggota = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Anggota.destroy({ where: { id } });
    res.json({ message: 'Anggota deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};