const mongoose = require('mongoose');
const randomize = require('crypto-random');
const Fact = require('../models/Fact');
const BadRequest = require('../utils/errorsConstructor/BadRequest');
const Forbidden = require('../utils/errorsConstructor/Forbidden');
const NotFound = require('../utils/errorsConstructor/NotFound');

const { ValidationError } = mongoose.Error;

const createFact = (req, res, next) => {
  const { question, answer, isTrue } = req.body;

  Fact.create({
    question,
    answer,
    isTrue,
    owner: req.user._id,
  })
    .then((fact) => {
      res.status(201).send({ data: fact });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else {
        next(err);
      }
    });
};

const getFact = (req, res, next) => {
  Fact.findById(req.params.factId)
    .orFail(new Error('Факт с таким ID не найден.'))
    .then((fact) => res.send({ data: fact }))
    .catch((err) => next(err));
};

const getRandomFact = (req, res, next) => {
  Fact.find({})
    .then((facts) => {
      const randomNumber = Math.floor(randomize.value() * facts.length);
      res.send({ data: facts[randomNumber] });
    })
    .catch((err) => next(err));
};

const getAllFacts = (req, res, next) => {
  Fact.find()
    .then((facts) => res.send({ data: facts }))
    .catch((err) => next(err));
};

const updateFact = (req, res, next) => {
  const { question, answer, isTrue } = req.body;

  if (!req.user.isAdmin) return next(new Forbidden('Недостаточно прав.'));

  return Fact
    .findByIdAndUpdate(
      req.params.factId,
      { question, answer, isTrue },
      { new: true, runValidators: true },
    )
    .then((updatedFact) => res.send({ data: updatedFact }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else {
        next(err);
      }
    });
};

const deleteFact = (req, res, next) => {
  if (!req.user.isAdmin) return next(new Forbidden('Недостаточно прав.'));

  return Fact.findById(req.params.factId)
    .orFail(new NotFound('Передан несуществующий ID факта.'))
    .then((foundFact) => Fact.deleteOne(foundFact)
      .then(() => res.send({ message: foundFact })))
    .catch((err) => next(err));
};

module.exports = {
  createFact,
  getFact,
  getRandomFact,
  getAllFacts,
  updateFact,
  deleteFact,
};
