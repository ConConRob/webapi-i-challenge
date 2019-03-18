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

server.get('/api/users', (req,res) => {
  db.find()
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json({ error: "The users information could not be retrieved." }))
})

server.get('/api/users/:id', (req,res) => {
  db.findById(req.params.id)
    .then(data => {
      if(!data) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }else {
        res.status(200).json(data)
      } 
      
    })
    .catch(()=> res.status(500).json({ error: "The user information could not be retrieved." }))
    
    
})

// server.delete('/api/users/:id', (req,res => {

// }))

server.listen(4000, () => console.log('Listening on port 4000'));