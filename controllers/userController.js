const mongoose = require('mongoose');

const { ValidationError } = mongoose.Error;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { JWT_SECRET } = require('../utils/config');
const BadRequest = require('../utils/errorsConstructor/BadRequest');
const Duplicate = require('../utils/errorsConstructor/Duplicate');
const Forbidden = require('../utils/errorsConstructor/Forbidden');
const NotFound = require('../utils/errorsConstructor/NotFound');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!password) return res.status(400).send({ message: 'Пароль не может быть пустым' });

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
      roles: ['Пользователь'],
    }))
    .then(() => res.status(201).send({
      name,
      email,
    }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else if (err.code === 11000) {
        next(new Duplicate('Пользователь с таким email уже зарегистрирован.'));
      } else {
        next(err);
      }
    });
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('Пользватель с таким ID не найден.'))
    .then((userData) => res.send({ data: userData }))
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const { name, password, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, password, email },
    { new: true, runValidators: true },
  )
    .then((updatedUserData) => res.send({ data: updatedUserData }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else if (err.code === 11000) {
        next(new Duplicate('Такой email уже используется другим пользователем.'));
      } else {
        next(err);
      }
    });
};

const updateUserById = (req, res, next) => {
  const {
    name, password, email, roles,
  } = req.body;

  if (!req.user.isAdmin) return next(new Forbidden('Недостаточно прав.'));

  return User.findByIdAndUpdate(
    req.params.userId,
    {
      name, password, email, roles,
    },
    { new: true, runValidators: true },
  )
    .then((updatedUserData) => res.send({ data: updatedUserData }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else if (err.code === 11000) {
        next(new Duplicate('Такой email уже используется другим пользователем.'));
      } else {
        next(err);
      }
    });
};

const deleteUserById = (req, res, next) => {
  if (!req.user.isAdmin) return next(new Forbidden('Недостаточно прав.'));

  return User.findById(req.params.userId)
    .orFail(new NotFound('Передан несуществующий ID пользователя.'))
    .then((foundUser) => {
      if (foundUser.roles.includes('Админ')) return next(new Forbidden('Невозможно удалить админа.'));
      return User.deleteOne(foundUser)
        .then(() => res.send({ message: 'Пользователь удален.' }));
    })
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const isAdmin = !!user.roles.includes('Админ');
      const token = jwt.sign({ _id: user._id, isAdmin }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token, isAdmin });
    })
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  getAllUsers,
  getCurrentUser,
  getUser,
  updateUser,
  login,
  updateUserById,
  deleteUserById,
};
