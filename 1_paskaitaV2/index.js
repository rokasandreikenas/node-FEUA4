const express = require("express"); // express modulio importavimas
const app = express(); // aplikacijos sukūrimas
const port = 3000; // porto (kanalo) skaičius

// routas (kelias) route/path
// get - grąžink duomenis
app.get("/", (req, res) => {
  // req - request(kas ateina iš išorės), res - response(kas ateina iš vidaus)
  res.send("Mano vardas yra Tomas"); // send metodas išsiunčia duomenis
});

app.get("/today", (req, res) => {
  res.send(new Date().toDateString());
});

app.get("/user", (req, res) => {
  const user = {
    name: "Rokas",
    surname: "Andreikenas",
    age: 24,
  };
  res.send(user);
});

// serverio paleidimas
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
