const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const user = {
    password: req.body.password,
    email: req.body.email,
    firstname: req.body.firstname,
    surname: req.body.surname,
    address: req.body.address,
    postcode: req.body.postcode,
    city: req.body.city,
    phone: req.body.phone,
    isAgreemnet: req.body.isAgreemnet,
  };
  users.push(user);
  res.send(users);
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
