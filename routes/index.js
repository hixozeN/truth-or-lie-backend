const router = require('express').Router();
const { login, createUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const NotFound = require('../utils/errorsConstructor/NotFound');

// Роутеры пользователей
router.use('/users', require('./userRouter'));

// Роутеры фактов
router.use('/facts', require('./factRouter'));

// Авторизация и регистрация
router.use('/login', login);
router.use('/register', createUser);

router.use('*', auth, (req, res, next) => {
  next(new NotFound('Указанный эндпоинт не найден.'));
});

module.exports = router;
