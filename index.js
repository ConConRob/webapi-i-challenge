// implement your API here

const express = require('express');
const db = require('./data/db')

const server = express()

server.use(express.json());

server.post('/api/users', (req, res) => {
  const {name, bio} = req.body;
  if(!name || !bio){
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.insert(req.body)
    .then(data => res.status(201).json({...data, name, bio}))
    .catch(err => res.status(500).json({ error: "The users information could not be retrieved." }))
})

server.listen(4000, () => console.log('Listening on port 4000'));