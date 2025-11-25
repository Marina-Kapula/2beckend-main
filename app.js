const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// --- СНАЧАЛА ВСЕ ТВОИ API-МАРШРУТЫ ---
app.get('/api/persons', (req, res) => {
  res.json([]);
});

app.post('/api/persons', (req, res) => {
  const person = req.body;
  res.status(201).json(person);
});

// --- И только ПОСЛЕ всего этого ---
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
});


const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { family: 4 })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.error('error connecting to MongoDB:', error.message));

module.exports = app;
