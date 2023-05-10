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

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// vieno user pridejimas
app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').insertOne(user);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .insertMany([
        {
          comment: 'Komentaras 123',
          date: new Date(),
          userId: new ObjectId(id),
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/comments', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .aggregate([
        {
          $lookup: {
            from: 'users', // kita kolekcija, su kuria jungiamasi
            localField: 'userId', // laukas iš users kolekcijos per kuri susijungia
            foreignField: '_id', // laukas iš comments kolekcijos per kuri pazysta
            as: 'user_name', // išeigos masyvo laukas
          },
        },
        {
          $unwind: '$user_name', // išplečia masyvą, kad kiekvienas elementas būtų atskiras dokumentas
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// daug useriu pridejimas
// app.post('/users', async (req, res) => {
//   try {
//     const con = await client.connect();
//     const data = await con
//       .db(dbName)
//       .collection('users')
//       .insertMany([
//         { name: 'Bob Johnson', email: 'bob.johnson@example.com' },
//         { name: 'Charlie Brown', email: 'charlie.brown@example.com' },
//         { name: 'David Lee', email: 'david.lee@example.com' },
//         { name: 'Emily Davis', email: 'emily.davis@example.com' },
//         { name: 'Frank Johnson', email: 'frank.johnson@example.com' },
//         { name: 'Grace Chen', email: 'grace.chen@example.com' },
//         { name: 'Henry Wang', email: 'henry.wang@example.com' },
//         { name: 'Isabella Kim', email: 'isabella.kim@example.com' },
//         { name: 'Jackie Lee', email: 'jackie.lee@example.com' },
//         { name: 'Katherine Chen', email: 'katherine.chen@example.com' },
//       ]);
//     await con.close();
//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
