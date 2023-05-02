const express = require('express');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

const posts = [];

app.get('/posts', (req, res) => {
  res.json(posts);
});

// {title: “gera diena”, description: “šiandien yra gera diena”, active: true}
app.post('/posts', (req, res) => {
  const post = req.body;
  const newPost = { id: posts.length + 1, ...post };
  posts.push(newPost);
  res.send(newPost);
});

app.get('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const foundPost = posts.find((post) => post.id === id);
  if (foundPost) {
    res.send(foundPost);
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});

app.put('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = posts.findIndex((post) => post.id === id);
  if (foundIndex !== -1) {
    const post = req.body;
    const updatingPost = { id, ...post };
    posts.splice(foundIndex, 1, updatingPost);
    res.send(updatingPost);
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});

app.delete('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = posts.findIndex((post) => post.id === id);
  if (foundIndex !== -1) {
    const deletingPost = posts.find((post) => post.id === id);
    posts.splice(foundIndex, 1);
    res.send(deletingPost);
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
