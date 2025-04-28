const db = require('../models');

exports.createAnime = async (req, res) => {
  const { judul } = req.body;
  try {
    const anime = await db.Anime.create({ judul });
    res.json(anime);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAnime = async (req, res) => {
  try {
    const anime = await db.Anime.findAll();
    res.json(anime);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnime = async (req, res) => {
  const { id } = req.params;
  const { judul } = req.body;
  try {
    await db.Anime.update({ judul }, { where: { id } });
    res.json({ message: 'Anime updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAnime = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Anime.destroy({ where: { id } });
    res.json({ message: 'Anime deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};