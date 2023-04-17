const express = require("express");
const app = express();
const port = 3000;
const casual = require("casual");

app.get("/randomUser", (req, res) => {
  const user = {
    name: `${casual.first_name}`,
    lastName: `${casual.last_name}`,
    country: `${casual.country}`,
    city: `${casual.city}`,
    street: `${casual.street}`,
    zip: `${casual.zip(5, 9)}`,
  };
  res.send(user);
});

app.get("/randomColor", (req, res) => {
  const color = casual.color_name;
  res.send(color);
});

app.get("/randomColors", (req, res) => {
  const colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(casual.color_name);
  }
  res.send(colors);
});

app.get("/randomPlaces", (req, res) => {
  const places = [];
  const numPlaces = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < numPlaces; i++) {
    const place = {
      country: casual.country,
      city: casual.city,
      address: `${casual.street} ${casual.address2}`,
    };
    places.push(place);
  }
  res.send(places);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
