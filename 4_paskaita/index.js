const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const cars = {
  bmw: ["i3", "i8", "1 series", "3 series", "5 series"],
  mb: ["A class", "C class", "E class", "S class"],
  vw: ["Golf", "Arteon", "UP"],
};

// abi eilutės daro tą patį
// console.log(cars.bmw);
// console.log(cars["bmw"]);

app.get("/bmw", (req, res) => {
  res.send(["i3", "i8", "1 series", "3 series", "5 series"]);
});

app.get("/audi", (req, res) => {
  res.send(["A4", "A5", "A6"]);
});

// dinaminis linkas, tas kuris prasideda su : (dvitaškiu)
app.get("/cars/:model", (req, res) => {
  // req.params - requesto parametrai
  // jeigu norime pasiekti dinaminį linką, turime naudoti tokį pati pavadinimą pvz :model būtų req.params.model
  //
  const model = req.params.model; // model = bmw

  res.send(cars[model]); // dinamiškai ištraukti duomenys
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
