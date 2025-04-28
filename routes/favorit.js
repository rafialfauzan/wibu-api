const express = require('express');
const router = express.Router();
const favoritController = require('../controllers/favoritController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, favoritController.addFavorit);
router.get('/:anggotaId', authenticateToken, favoritController.getFavorit);
router.delete('/', authenticateToken, favoritController.removeFavorit);

module.exports = router;
