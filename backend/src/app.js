const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const playerData = {
  xp: 75,
  maxXP: 100,
  level: 2,
};

app.get('/', (req, res) => {
  res.json({
    message: 'Backend RPG działa!',
  });
});

app.get('/api/player', (req, res) => {
  res.json(playerData);
});

app.listen(5000, () => {
  console.log('Serwer działa na porcie 5000');
});
