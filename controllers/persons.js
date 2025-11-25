const express = require('express');
const personsRouter = express.Router();
const Person = require('../models/person');

// Получить всех
personsRouter.get('/', async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

// Добавить нового
personsRouter.post('/', async (req, res) => {
  const { name, number } = req.body;
  const person = new Person({ name, number });
  const savedPerson = await person.save();
  res.status(201).json(savedPerson);
});

module.exports = personsRouter;
