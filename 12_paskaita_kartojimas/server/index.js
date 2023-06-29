const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json()); // aplikacija moka apdoroti JSON formatu ateinancius requestus
app.use(cors());

const client = new MongoClient(URI);

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('pets').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const { type, name } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('pets')
      .insertOne({ type, name, ownerId: new ObjectId(req.body.ownerId) }); // new ObjectId(id)
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/ownersWithPets', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('owners')
      .aggregate([
        {
          $lookup: {
            from: 'pets',
            localField: '_id',
            foreignField: 'ownerId',
            as: 'pets',
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// /owners?sort=asc
// /owners?sort=dsc
app.get('/owners', async (req, res) => {
  try {
    const { sort } = req.query;
    const sortType = sort === 'asc' ? 1 : -1;

    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('owners')
      .find()
      .sort({ income: sortType }) // 1 didejimo -1 mazejimo
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});
