const express = require('express');
const router = express.Router();
const anggotaController = require('../controllers/anggotaController');
const { createAnggotaValidation } = require('../middlewares/anggotaValidator');
const { validate } = require('../middlewares/validate');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, createAnggotaValidation, validate, anggotaController.createAnggota);
router.get('/', authenticateToken, anggotaController.getAllAnggota);
router.put('/:id', authenticateToken, anggotaController.updateAnggota);
router.delete('/:id', authenticateToken, anggotaController.deleteAnggota);

module.exports = router;