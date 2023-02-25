const Router = require('express');
const router = new Router();
const controller = require('../controllers/AuthController');
const {check} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration', [
  check('username', "Имя пользователя не может быть пустым").notEmpty(),
  check('password', "Пароль должен быть больше 6 символов").isLength({min: 6, max: 25})
], controller.registartion);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(["Админ"]), controller.getUsers);

module.exports = router;