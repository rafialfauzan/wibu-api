const db = require('../models');

exports.addFavorit = async (req, res) => {
  const { anggotaId, animeId } = req.body;
  try {
    const anggota = await db.Anggota.findByPk(anggotaId);
    const anime = await db.Anime.findByPk(animeId);

    if (!anggota || !anime) {
      return res.status(404).json({ message: 'Anggota atau Anime tidak ditemukan' });
    }

    await anggota.addAnime(anime);
    res.json({ message: 'Anime ditambahkan ke favorit anggota' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFavorit = async (req, res) => {
  const { anggotaId } = req.params;
  try {
    const anggota = await db.Anggota.findByPk(anggotaId, {
      include: db.Anime
    });

    if (!anggota) {
      return res.status(404).json({ message: 'Anggota tidak ditemukan' });
    }

    res.json(anggota.Animes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFavorit = async (req, res) => {
  const { anggotaId, animeId } = req.body;
  try {
    const anggota = await db.Anggota.findByPk(anggotaId);
    const anime = await db.Anime.findByPk(animeId);

    if (!anggota || !anime) {
      return res.status(404).json({ message: 'Anggota atau Anime tidak ditemukan' });
    }

    await anggota.removeAnime(anime);
    res.json({ message: 'Anime dihapus dari favorit anggota' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};