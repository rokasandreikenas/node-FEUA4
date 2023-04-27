const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

const tickets = [];

app.get('/tickets', (req, res) => {
  res.json(tickets);
});

app.get('/tickets/:id', (req, res) => {
  const foundTicket = tickets.find((ticket) => ticket.id === +req.params.id);
  if (!foundTicket) {
    res.status(404).send('Ticket not found');
  } else {
    res.send(foundTicket);
  }
});

app.post('/tickets', (req, res) => {
  const item = req.body;
  // item.id = tickets.length + 1; // mutuojant pridedamas id
  const ticket = { id: tickets.length + 1, ...item }; // sukuriamas naujas objektas
  // a = {id: 1}  b = {row: 1, seat: 5} = {...a, ...b}
  tickets.push(ticket);
  res.status(201).send(ticket);
});

// a = [a, b, c]
// a.splice(1,2) = [a]
// a.splice(0,1) = [b, c]
app.delete('/tickets/:id', (req, res) => {
  const index = tickets.findIndex((item) => item.id === +req.params.id);
  if (index === -1) {
    // index -1 jeigu neranda itemo masyve
    res.status(404).send('Ticket not found');
  } else {
    tickets.splice(index, 1); // ištrina elemenetą pagal jo indexą masyve
    res.send('Ticket removed from cart');
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
