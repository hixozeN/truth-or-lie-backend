const {Schema, model} = require('mongoose');

const Fact = new Schema({
  question: {type: String, required: true},
  answer: {type: String, required: true},
  isTrue: {type: Boolean, required: true}
});

module.exports = model('Fact', Fact);