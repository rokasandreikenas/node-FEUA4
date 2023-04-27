const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

const todos = [];

app.get('/todos', (req, res) => {
  res.send(todos);
});

// {id, title, done}
app.post('/todos', (req, res) => {
  const todo = req.body;
  const newTodo = { id: todos.length + 1, ...todo }; // pridedamas id prie siunčiamo objekto
  todos.push(newTodo); // pridedama į masyvą
  res.send(newTodo); // išsiunčiamas response
});

app.get('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const foundTodo = todos.find((todo) => todo.id === id); // randa {...}, jei ne undefined
  if (foundTodo) {
    // jeigu randa
    res.send(foundTodo);
  } else {
    // jeigu neranda - 404 not found
    // res.status() - grąžina statusą
    res.status(404).send({ message: 'Todo not found' });
  }
});

app.delete('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = todos.findIndex((todo) => todo.id === id); // randa 0-begalybės, neranda -1
  if (foundIndex !== -1) {
    // jeigu randa
    const deletingTodo = todos.find((todo) => todo.id === id);
    todos.splice(foundIndex, 1);
    res.send(deletingTodo); // grąžinam elementą kurį trinam
  } else {
    // jeigu neranda
    res.status(404).send({ message: 'Todo not found' });
  }
});

app.put('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = todos.findIndex((todo) => todo.id === id);
  if (foundIndex !== -1) {
    const todo = req.body; // naujai siunčiamas todo
    const updatingTodo = { id, ...todo }; // senas id + naujas todo
    todos.splice(foundIndex, 1, updatingTodo); // užkeičiamas atnaujintas todo
    res.send(updatingTodo);
  } else {
    res.status(404).send({ message: 'Todo not found' });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
