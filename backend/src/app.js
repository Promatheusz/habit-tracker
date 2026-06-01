const express = require('express');
const cors = require('cors');
const { initDb } = require('./config/db');
const playerRoutes = require('./routes/playerRoutes');
const habitRoutes = require('./routes/habitRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ścieżki podstawowe
app.get('/', (req, res) => {
  res.json({ message: 'Backend RPG działa!' });
});

// Podłączenie ruterów (API Routes)
app.use('/api', playerRoutes);
app.use('/api', habitRoutes);

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serwer działa na porcie ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Błąd inicjalizacji bazy danych:', err);
    process.exit(1);
  });
