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

app.post("/login", (req, res) => {
  // req.body = {email: "rokas@gmail.com", password: "rokas123"}
  //
  let foundedUser = users.find((user) => user.email === req.body.email);
  // jeigu randa foundedUser = {email: "rokas@gmail.com", password: "rokas123", ...}
  // jeigu neranda foundedUser = undefined
  if (foundedUser !== undefined) {
    // rado
    let submittedPassword = req.body.password; // test
    let storedPassword = foundedUser.password; // test
    // test === test
    // rokas123 === rokas123!
    if (submittedPassword === storedPassword) {
      res.send({ message: "Sekmingai prisijungete", approved: true });
    } else {
      res.send({ message: "Neteisingas slaptažodis", approved: false });
    }
  } else {
    // nerado
    res.send({
      message: "Neteisingas el. paštas",
      approved: false,
    });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
