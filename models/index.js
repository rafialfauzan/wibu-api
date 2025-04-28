const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({ alter: true });

// Import models
db.Anggota = require('./anggota')(sequelize, Sequelize);
db.Anime = require('./anime')(sequelize, Sequelize);
db.Favorit = require('./favorit')(sequelize, Sequelize);

// Relasi
db.Anggota.belongsToMany(db.Anime, { through: db.Favorit });
db.Anime.belongsToMany(db.Anggota, { through: db.Favorit });

module.exports = db;