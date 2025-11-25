const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Маршрут для фронта: получаем все контакты!
app.get('/api/persons', (req, res) => {
  // Пример — массив
  res.json([{ name: "Test", number: "12345" }]);
});

// Можно добавить остальные (POST, DELETE, GET по :id и т.д.)

// Неизвестный маршрут
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
});

module.exports = app; // <-- ВНИМАНИЕ: экспортируем app!
