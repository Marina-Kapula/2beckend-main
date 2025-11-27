const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // раздаём собранный frontend

mongoose.connect(process.env.MONGODB_URI, { family: 4 })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.error('error connecting to MongoDB:', error.message));

const Person = require('./models/person');

// GET all persons
app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

// GET info
app.get('/info', async (req, res) => {
  const count = await Person.countDocuments({});
  const now = new Date();
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${now}</p>
  `);
});

// GET single person
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

// POST new person
app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body;
  const person = new Person({ name, number });

  try {
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    next(error);
  }
});

// PUT update person
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

// DELETE person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
});

// SPA fallback: все НЕ /api запросы отдать index.html
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Unknown endpoint (если что-то всё-таки не поймали)
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

// Error handler
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
