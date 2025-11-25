const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// ДОБАВЬ ВОТ ЭТО!
app.get('/api/persons', (req, res) => {
  // Для теста отдай хотя бы пустой массив — чтобы фронт заработал!
  res.json([]);
});

// Обрезка неизвестных маршрутов
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
});


app.post('/api/persons', (req, res) => {
  // Для теста — просто верни то, что пришло, пусть даже без сохранения!
  const person = req.body;
  // Можно добавить проверку, а можно сразу вернуть
  res.status(201).json(person);
});


module.exports = app;
