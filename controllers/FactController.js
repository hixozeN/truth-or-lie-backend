const Fact = require('../models/Facts');
const {validationResult} = require('express-validator');
const {secret} = require('../config');
const random = require('crypto-random');

class FactController {
  async create(req, res) {
    try {
      const {question, answer, isTrue} = req.body;
      const fact = new Fact({question, answer, isTrue});
      await fact.save();
      return res.json({message: `Факт успешно создан`});
    } catch (e) {
      console.log(e);
    }
  }

  async getFact(req, res) {
    try {
      const facts = await Fact.find();
      return res.json(facts);
    } catch (e) {
      console.log(e);
    }
  }

  async getRandomFact(req, res) {
    try {
      const facts = await Fact.find();
      let randomedNumber = Math.floor(random.value() * facts.length);
      return res.json(facts[randomedNumber]);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(req, res) {
    try {

    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = new FactController();
