// 1. Sukurkite bendrinį GET route, kuris paduos visus duomenis.
// 2. Sukurkite dinaminį GET route, kur URL turės automobilio markę ir pagal ją prafiltruos, ir grąžins tik tuos žmones, kurie turi šį automobilį.
// 3. Sukurkite dinaminį GET route, kuris priims vartotojo id ir pagal jį grąžins atitinkamą vartotojo objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės konvertuoti.
// 4. Sukurkite GET route, kuris grąžins visus el. paštus (grąžinamas formatas: ["anb@abc.com", "abc@abc.com", "abc@acb.com]).
// 5. Sukurkite GET route, į kurį pasikreipus, grąžins visų moterų (gender: Female) vardą ir pavardę (formatas: ["Rita Kazlauskaite", "Monika Simaskaite"]).

const express = require("express");
const cors = require("cors");
const data = require("./data"); // importuojam duomenis
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

// 1
app.get("/", (req, res) => {
  res.send(data);
});

// 2
app.get("/cars/:model", (req, res) => {
  const model = req.params.model;
  const filteredClients = data.filter(
    (client) => client.car.toLowerCase() === model.toLowerCase()
  );
  res.send(filteredClients);
});

// 3
app.get("/clients/:id", (req, res) => {
  const id = req.params.id;
  // 1 === "1"
  const foundClient = data.find((client) => client.id === +id);
  res.send(foundClient);
});

// 4 ["anb@abc.com", "abc@abc.com", "abc@acb.com]
app.get("/emails", (req, res) => {
  const emails = data.map((client) => client.email);
  res.send(emails);
});

// 5
app.get("/females", (req, res) => {
  const filteredFemales = data.filter((client) => client.gender === "Female");
  const femalesFullNames = filteredFemales.map(
    (female) => `${female.first_name} ${female.last_name}`
  );
  res.send(femalesFullNames);
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
