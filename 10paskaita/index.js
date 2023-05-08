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

app.get('/orders', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('purchase_orders')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/orders/count', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('purchase_orders')
      .countDocuments({ product: 'toothbrush' });
    // countDocuments = count, bet count yra deprecated (pasenęs ir nenaudojamas)
    // countDocuments() - grąžina skaičių, kiek yra dokumentų iš viso
    // countDocuments({ product: 'toothbrush' }) - grąžina pagal kriterijų pvz. kiek yra toothbrush
    await con.close();
    // data = 10
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz. 10
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/orders/unique', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('purchase_orders')
      .distinct('product'); // grąžina unikalias reikšmes, būtinai reikia nurodyti kriterijų t.y. raktą

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/orders/customerSpent', async (req, res) => {
  // total amount of money spent by each customer - kiek kiekvienas asmuo išleido pinigų
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('purchase_orders')
      .aggregate([
        { $group: { _id: '$customer', totalAmount: { $sum: '$total' } } },
        { $sort: { totalAmount: -1 } },
      ])
      .toArray();
    // $group - sugrupuoja, _id: $customer - naudoja unikalų customerį,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: -1 } - sortina mažėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/orders/productSoldAmount', async (req, res) => {
  // total amount of money spent on each product - kiek išleido pinigų and kiekvieno produkto
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('purchase_orders')
      .aggregate([
        { $group: { _id: '$product', totalAmount: { $sum: '$total' } } },
        { $sort: { totalAmount: 1 } },
      ])
      .toArray();
    // $group - sugrupuoja, _id: $product - naudoja unikalų produktą,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: 1 } - sortina didėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/orders/liquids', async (req, res) => {
  // total amount of money spent on each liquid product
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('purchase_orders')
      .aggregate([
        {
          $match: { product: { $in: ['shampoo', 'conditioner', 'mouthwash'] } },
        },
        { $group: { _id: '$product', totalAmount: { $sum: '$total' } } },
        { $sort: { totalAmount: 1 } },
      ])
      .toArray();
    // $match - atitikmenys,
    // {product:{ $in:['shampoo', 'conditioner', 'mouthwash']}} žiūrima per product; išvardintuose
    // $group - sugrupuoja, _id: $product - naudoja unikalų produktą,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: 1 } - sortina didėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/orders', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('purchase_orders')
      .insertMany([
        {
          product: 'toothbrush',
          total: 4.75,
          customer: 'Rokas',
        },
        {
          product: 'soap',
          total: 2.5,
          customer: 'Alice',
        },
        {
          product: 'shampoo',
          total: 7.0,
          customer: 'Bob',
        },
        {
          product: 'toothpaste',
          total: 3.25,
          customer: 'Cathy',
        },
        {
          product: 'conditioner',
          total: 6.5,
          customer: 'David',
        },
        {
          product: 'mouthwash',
          total: 5.0,
          customer: 'Ella',
        },
        {
          product: 'floss',
          total: 2.0,
          customer: 'Frank',
        },
        {
          product: 'body wash',
          total: 4.0,
          customer: 'Grace',
        },
        {
          product: 'deodorant',
          total: 3.5,
          customer: 'Henry',
        },
        {
          product: 'razor',
          total: 10.0,
          customer: 'Irene',
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
