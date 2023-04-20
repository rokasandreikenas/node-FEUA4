const express = require("express");
const cors = require("cors");
const data = require("./data"); // importuojam duomenis
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(data);
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
