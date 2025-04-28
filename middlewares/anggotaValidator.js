const { body } = require('express-validator');

exports.createAnggotaValidation = [
    body('nama').notEmpty().withMessage('Nama wajib diisi')
];