const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'O slug é obrigatório'],
    trim: true,
    index: true,
    unique: true
  },
  date: { 
    type: Date,
    default: Date.now
  },
  manufacturerName: {
    type: String,
    required: [true, 'O nome do fabricante é obrigatório'],
    trim: true
  },
  line: {
    type: String,
    trim: true
  },
  petType: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  racePorte: {
    type: String,
    trim: true
  },
  race: {
    type: String,
    trim: true
  },
  age: {
    type: String,
    trim: true
  },
  amount: {
    type: String,
    trim: true
  },
  indication: {
    type: String,
    trim: true
  },
  use: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    trim: true
  },
  howToUse: {
    type: String,
    trim: true
  },
  benefits: {
    type: String,
    trim: true
  },
  smell: {
    type: String,
    trim: true
  },
  materialType: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  imageURL: {
    type: String,
    // required: true,
  },
  tags: [{
    type: String,
    required: true
  }]
});

module.exports = mongoose.model('Product', schema);