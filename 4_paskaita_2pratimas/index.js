// 1. Sukurkite bendrinį GET route, kuris paduos visus prekių duomenis.
// 2. Sukurkite dinaminį GET route, kur URL turės prekės kategoriją, ir pagal ją prafiltruos,
// bei grąžins tik tuos produktus, kurie priklauso šiai kategorijai.
// 3. Sukurkite dinaminį GET route, kuris priims prekės id ir pagal jį grąžins atitinkamą
// prekės objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės
// konvertuoti.
// 4. Sukurkite GET route, kuris grąžins visų prekių pavadinimus (grąžinamas formatas:
// ["iPhone 13", "Samsung Galaxy S22", "Dell XPS 15", "MacBook Pro", "Sony WH-
// 1000XM4", "Bose QuietComfort 35 II"]).
// 5. Sukurkite GET route, į kurį pasikreipus, grąžins visų prekių, kurių kiekis sandėlyje yra
// mažesnis už nurodytą kiekį, pavadinimus ir likutis (formatas: [{"name": "Samsung Galaxy S22", "stock": 5}, {"name": "Dell XPS 15", "stock": 3}]).
// 6. Papildomas: Sukurkite dinaminį GET route, kuris pagal kainos intervalą grąžins prekes, kurių kaina yra tarp nurodytų ribų (įskaitant jas). Parametrai turėtų būti perduodami URL kaip minPrice ir maxPrice.(du parametrai reikalingi)
// 7. Papildomas: Sukurkite POST route, kuris leis pridėti naują prekę prie duomenų sąrašo. Nauja prekė turėtų turėti id, name, category, price ir stock laukus. Užtikrinkite, kad naujoji prekė neturėtų to paties id kaip jau esančios prekės.

const express = require("express");
const cors = require("cors");
const data = require("./data"); // importuojam duomenis
const slugify = require("slugify");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(data);
});

// 2
app.get("/products/categories/:category", (req, res) => {
  const category = slugify(req.params.category);
  console.log(category);
  const filteredProducts = data.filter(
    (product) =>
      slugify(product.category.toLowerCase()) === category.toLowerCase()
  );
  res.send(filteredProducts);
});

// 3
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const foundProduct = data.find((product) => product.id === id);
  res.send(foundProduct);
});

// 4
app.get("/names", (req, res) => {
  const names = data.map((product) => product.name);
  res.send(names);
});

// 5
app.get("/stock", (req, res) => {
  const filteredProducts = data.filter((product) => product.stock < 10);
  const stocks = filteredProducts.map((product) => {
    return {
      name: product.name,
      stock: product.stock,
    };
  });
  res.send(stocks);
});

// 6
app.get("/products/:minPrice/:maxPrice", (req, res) => {
  const minPrice = Number(req.params.minPrice);
  const maxPrice = Number(req.params.maxPrice);
  const filteredProducts = data.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
  res.send(filteredProducts);
});

// 7
app.post("/products", (req, res) => {
  const newProduct = req.body;

  const isIdExist = data.some((product) => product.id === newProduct.id);

  if (isIdExist) {
    res.send("Product with this ID already exists.");
  } else {
    data.push(newProduct);
    res.send(req.body);
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
