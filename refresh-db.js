const db = require('./models');

( async () => {
    try {
        console.log('📛 Menghapus dan membuat ulang semua tabel...');
        await db.sequelize.sync({ force: true});
        console.log.log('✅ Semua tabel berhasil dihapus dan dibuat ulang!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Gagal menghapus dan membuat ulang tabel:', error);
        process.exit(1);
    }
})();