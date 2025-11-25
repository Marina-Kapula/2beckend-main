const app = require('./app'); // Подключаем express-приложение из app.js

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
