const userRouter = require('express').Router();
const auth = require('../middleware/auth');

const {
  getAllUsers,
  getUser,
  updateUser,
  updateUserById,
  deleteUserById,
} = require('../controllers/userController');

userRouter.get('/', auth, getAllUsers);
userRouter.get('/:userId', auth, getUser);
userRouter.patch('/', auth, updateUser);

// Админские роуты
userRouter.patch('/:userId', auth, updateUserById);
userRouter.delete('/:userId', auth, deleteUserById);

module.exports = userRouter;
