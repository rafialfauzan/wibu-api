require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');

// Middleware
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/anggota', require('./routes/anggota'));
app.use('/anime', require('./routes/anime'));
app.use('/favorit', require('./routes/favorit'));

// Sync database
db.sequelize.sync({ force: false }).then(() => {
  console.log('Database connected and tables synced');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
});