const Router = require('express');
const factRouter = new Router();
const factController = require('../controllers/FactController');
//const {check} = require('express-validator');

factRouter.post('/create', factController.create);
factRouter.get('/getFact', factController.getFact);
factRouter.get('/getRandomFact', factController.getRandomFact);
//router.post('/verify', controller.verify);
//router.delete('/delete', roleMiddleware(["Админ"]), controller.delete);

module.exports = factRouter;

/* 
Валидация создания
[
  check('question', "Вопрос не может быть меньше 10 символов").isLength({min: 10}),
  check('answer', "Ответ не может быть пустым").notEmpty(),
  check('isTrue', "Обязательное поле").notEmpty()
]
*/