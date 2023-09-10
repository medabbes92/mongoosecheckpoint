const mongoose = require('mongoose');

// Define the Person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;

