const Fact = require('../models/Facts');
const {validationResult} = require('express-validator');
const {secret} = require('../config');

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

exports.module = new FactController();
