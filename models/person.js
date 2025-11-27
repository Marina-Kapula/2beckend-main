const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3, // 3.19
  },
  number: {
    type: String,
    required: true,
    minlength: 8, // 3.20
    validate: {
      validator: v => /^(\d{2}|\d{3})-\d+$/.test(v), // 3.20 формат номера
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
});

module.exports = mongoose.model('Person', personSchema);
