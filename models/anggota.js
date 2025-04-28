const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Anggota = sequelize.define('Anggota', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    //hash password sebelum save
    Anggota.beforeCreate(async (anggota) => {
        const salt = await bcrypt.genSalt(10);
        anggota.password = await bcrypt.hash(anggota.password, salt);
    });

    return Anggota;
};