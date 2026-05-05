const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: "Backend RPG działa! XP: 100/100" });
});

app.listen(5000, () => console.log('Serwer biega na porcie 5000'));