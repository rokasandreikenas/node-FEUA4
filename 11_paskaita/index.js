const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/ownersWithPets', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('owners')
      .aggregate([
        {
          $lookup: {
            from: 'pets', // kitos kolekcijos pavadinimas
            localField: '_id', // owners kolekcijos raktas per kurį susijungia
            foreignField: 'ownerId', // kitos kolekcijos raktas per kurį susijungia
            as: 'pets', // naujo rakto pavadinimas
          },
        },
      ])
      .toArray();
    // $lookup - sujungia dvi kolekcijas
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/petsWithOwner', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('pets')
      .aggregate([
        {
          $lookup: {
            from: 'owners', // kita kolekcija, su kuria jungiamasi
            localField: 'ownerId', // laukas iš pets kolekcijos
            foreignField: '_id', // laukas iš owners kolekcijos
            as: 'owner_info', // išeigos masyvo laukas
          },
        },
        {
          $unwind: '$owner_info', // išplečia masyvą, kad kiekvienas elementas būtų atskiras dokumentas
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/owners', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('owners').deleteMany(); // ištrina visus
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/owners/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('owners')
      .deleteOne({ _id: new ObjectId(id) }); // ištrina vieną
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/pets/:id', async (req, res) => {
  // prieš pridedant gyvūną, reikia pridėti jų savininkų kolekciją
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('pets')
      .insertMany([
        {
          type: 'cat',
          name: 'Murka',
          ownerId: new ObjectId(id), // pasiimam iš parametrų pvz. /pets/645a7886c5e5702f9adb1470
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/owners', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('owners')
      .insertMany([
        {
          name: 'Alice Smith',
          email: 'alice.smith@example.com',
          city: 'New York',
          income: 6000,
        },
        {
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          city: 'Los Angeles',
          income: 7000,
        },
        {
          name: 'Charlie Brown',
          email: 'charlie.brown@example.com',
          city: 'Chicago',
          income: 4500,
        },
        {
          name: 'David Lee',
          email: 'david.lee@example.com',
          city: 'San Francisco',
          income: 8000,
        },
        {
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          city: 'Boston',
          income: 5500,
        },
        {
          name: 'Frank Rodriguez',
          email: 'frank.rodriguez@example.com',
          city: 'Miami',
          income: 6500,
        },
        {
          name: 'Grace Kim',
          email: 'grace.kim@example.com',
          city: 'Seattle',
          income: 5000,
        },
        {
          name: 'Henry Nguyen',
          email: 'henry.nguyen@example.com',
          city: 'Houston',
          income: 7500,
        },
        {
          name: 'Isabella Taylor',
          email: 'isabella.taylor@example.com',
          city: 'Washington DC',
          income: 9000,
        },
        {
          name: 'Bob Chen',
          email: 'jack.chen@example.com',
          city: 'San Diego',
          income: 6000,
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
