const factRouter = require('express').Router();
const auth = require('../middleware/auth');

const {
  createFact,
  getFact,
  getRandomFact,
  getAllFacts,
  updateFact,
  deleteFact,
} = require('../controllers/factController');

factRouter.post('/', auth, createFact);
factRouter.get('/all', auth, getAllFacts);
factRouter.get('/:factId', auth, getFact);
factRouter.get('/', getRandomFact);
factRouter.patch('/:factId', auth, updateFact);
factRouter.delete('/:factId', auth, deleteFact);

module.exports = factRouter;
