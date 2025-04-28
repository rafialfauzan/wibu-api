module.exports = (sequelize, DataTypes) => {
    const Anime = sequelize.define('Anime', {
        judul: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Anime;
};