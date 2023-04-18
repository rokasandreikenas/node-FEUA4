const express = require("express"); // express importas
const cors = require("cors"); // CORS importas
const app = express(); // express aplikacijos inicijavimas

app.use(express.json()); // aplikacija priima duomenis JSON formatu
app.use(cors()); // aplikacija naudoja CORS apsaugą

const port = 3000; // kanalas reikalingas serveriui

const cars = ["mercedes"];

// GET kelias, kuris grąžina duomenis
app.get("/", (req, res) => {
  // res (response) - duomenys kuriuos mes grąžinam
  res.send(cars); // res.send() - metodas kuris grąžina klientui atsakymą
});

app.post("/", (req, res) => {
  // req (request) - duomenys kuriuos mes gaunam iš išorės
  // req.body - pagrindiniai duomenys iš išorės
  const car = req.body.car;
  console.log(req.body);
  cars.push(car);
  res.send(req.body); // POST dalyje siunčiam atgal klientui, tai ką jis pats atsiuntė mum
});

// app.listen() - metodas kuris paleidžia klausytis mūsų serverio nurodytu kanalu
// port - kanalas
// () => {} - funkcija kuri pasileidžia, kai serveris startuoja
// console.log naudojam, kad žinoti kokiu kanalu paleido serverį
app.listen(port, () => {
  console.log(`Server is running on the http://localhost:${port}/`);
});
