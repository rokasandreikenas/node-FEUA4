const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/restaurants', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Restaurants')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/restaurants', async (req, res) => {
  try {
    const restaurant = req.body;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Restaurants')
      .insertOne(restaurant);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
