const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');
const { createAnimeValidation } = require('../middlewares/animeValidator');
const { validate } = require('../middlewares/validate');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, createAnimeValidation, validate, animeController.createAnime);
router.get('/', authenticateToken, animeController.getAllAnime);
router.put('/:id', authenticateToken, animeController.updateAnime);
router.delete('/:id', authenticateToken, animeController.deleteAnime);

module.exports = router;
