// Dažniausiai naudojamos aplinkos: development (pas mus),
// testing, preprod (versija prieš galutinę), production (galutinė versija kurią mato visi klientai)

const express = require('express');
const cors = require('cors');
require('dotenv').config();
// process.env tai yra objektas sukurtas iš mūsų .env failo
const port = process.env.PORT || 8080; // || 8080 - grįžtamasis ryšys jeigu PORT bus nerastas

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send([]);
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
