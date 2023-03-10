const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config')

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  };
  return jwt.sign(payload, secret, {expiresIn: "8760h"}); // Аксесс токен на год!!! Рефреш-токен не делал, поменять после разработки refreshToken!!!
};

class AuthController {
  async registartion(req, res) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({message: "Ошибка при регистрации", errors});
      }
      const {username, password} = req.body;
      const candidate = await User.findOne({username});
      if(candidate) {
        return res.status(400).json({message: "Пользователь  с таким именем уже существует"});
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({value: "Пользователь"});
      const user = new User({username, password: hashPassword, roles: [userRole.value]});
      await user.save();
      return res.json({message: `Пользователь ${user.username} зарегистрирован`});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Ошибка регистрации'});
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json({message: `Пользоватеь ${username} не существует`});
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if(!validPassword) {
        return res.status(400).json({message: 'Неверный пароль'});
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({token, user});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Ошибка логина'});
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = new AuthController();