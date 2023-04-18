const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

const products = [];

app.get("/products", (req, res) => {
  res.send(products);
});

app.post("/products", (req, res) => {
  const product = { name: req.body.name, price: req.body.price }; // sukuria objekta is siunciamo body
  products.push(product);
  res.send(product);
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
