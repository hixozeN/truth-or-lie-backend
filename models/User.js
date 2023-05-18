const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Unauth = require('../utils/errorsConstructor/Unauth');

const User = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" не может быть пустым'],
      minlength: [2, 'Минимальная длина поля "username" - 2'],
      maxlength: [30, 'Максимальная длина поля "username" - 30'],
    },
    email: {
      type: String,
      required: [true, 'Поле "email" не может быть пустым'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный email',
      },
    },
    roles: [{ type: String, ref: 'Role' }],
    password: {
      type: String,
      required: [true, 'Поле "password" не может быть пустым'],
      select: false,
    },
    regDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
User.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new Unauth('Неправильная почта или пароль'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new Unauth('Неправильная почта или пароль'));
          return user;
        });
    });
};

module.exports = model('User', User);
