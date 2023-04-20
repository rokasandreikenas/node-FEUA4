// JSON.parse() - atvirkščiai nei JSON.stringify() - išparsina JSON duomenis į JavaScript duomenis
// šiuo atveju JSON paverčiamas į Javascript array su objektais
const data = JSON.parse(`const products = [
  {
    id: 1,
    name: "iPhone 13",
    category: "Telefonai",
    price: 1100,
    stock: 10
  },
  {
    id: 2,
    name: "Samsung Galaxy S22",
    category: "Telefonai",
    price: 900,
    stock: 5
  },
  {
    id: 3,
    name: "Dell XPS 15",
    category: "Nešiojami kompiuteriai",
    price: 2000,
    stock: 3
  },
  {
    id: 4,
    name: "MacBook Pro",
    category: "Nešiojami kompiuteriai",
    price: 2500,
    stock: 20
  },
  {
    id: 5,
    name: "Sony WH-1000XM4",
    category: "Ausinės",
    price: 350,
    stock: 8
  },
  {
    id: 6,
    name: "Bose QuietComfort 35 II",
    category: "Ausinės",
    price: 300,
    stock: 12
  }
]
  `);

// exportuojam data kintamąjį
// tas pats kas export const
module.exports = data;
