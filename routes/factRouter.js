const Router = require('express');
const router = new Router();
const controller = require('../controllers/FactController');
//const {check} = require('express-validator');

router.post('/create', controller.create);
//router.get('/getFact', controller.getFact);
//router.post('/verify', controller.verify);
//router.delete('/delete', roleMiddleware(["Админ"]), controller.delete);

module.exports = router;

/* 
Валидация создания
[
  check('question', "Вопрос не может быть меньше 10 символов").isLength({min: 10}),
  check('answer', "Ответ не может быть пустым").notEmpty(),
  check('isTrue', "Обязательное поле").notEmpty()
]
*/