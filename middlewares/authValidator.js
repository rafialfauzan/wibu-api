const { body } = require('express-validator');

exports.registerValidation = [
    body('username').notEmpty().withMessage('Username wajib diisi'),
    body('nama').notEmpty().withMessage('Nama wajib diisi'),
    body('password').notEmpty().withMessage('Password wajib diisi')
];

exports.loginValidation = [
    body('username').notEmpty().withMessage('Username wajib diisi'),
    body('password').notEmpty().withMessage('Password wajib diisi')
];