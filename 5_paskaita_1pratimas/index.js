const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const cart = [];

// 1
app.get("/cart", (req, res) => {
  res.send(cart);
});

// 3
app.get("/cart/:id", (req, res) => {
  const item = cart.find((item) => item.id === +req.params.id);
  if (!item) {
    // jeigu neranda - 404 status nerado resurso
    res.status(404).send("Item not found");
  } else {
    // jeigu randa
    res.send(item);
  }
});

// 2
app.post("/cart", (req, res) => {
  const item = req.body;
  item.id = cart.length + 1; // pridedamas dinaminis id pagal krepšelio ilgį +1
  cart.push(item);
  // res.status() - grąžina http statusą, kuris nurodo response būseną
  res.status(201).send(item);
});

app.delete("/cart/:id", (req, res) => {
  const index = cart.findIndex((item) => item.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send("Item not found");
  } else {
    cart.splice(index, 1);
    res.send("Item removed from cart");
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
