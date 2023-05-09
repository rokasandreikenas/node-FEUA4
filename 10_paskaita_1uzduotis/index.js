const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

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

app.get('/users/usersCount', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').countDocuments();
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/Bob', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
      .countDocuments({ name: 'Bob Johnson' });
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/cities', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').distinct('city');
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/lowestIncome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
      .aggregate([{ $sort: { income: 1 } }])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/highestIncome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
      .aggregate([{ $sort: { income: -1 } }])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/dynamicUsersCount/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
      .countDocuments({ name: { $regex: `${name}\\b` } });
    // .countDocuments({ name }); // be regex
    // regex stringas kuris atitaiko taisyklę ir surandą
    // gerai nesuprantu bet chatGPT sugeneravo, veikia... :D
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
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
