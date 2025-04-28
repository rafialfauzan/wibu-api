const { body } = require('express-validator');

exports.createAnimeValidation = [
    body('judul').notEmpty().withMessage('Judul wajib diisi'),
];