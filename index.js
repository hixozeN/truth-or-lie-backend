require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Роуты приложения
const router = require('./routes');
// Извлекаем данные из конфига
const { PORT, MONGO_DB } = require('./utils/config');
// Централизованный обработчик ошибок
const responseHandler = require('./middleware/responseHandler');

const app = express();
app.use(express.json());

// CORS politicy
app.use(cors({
  origin: '*',
}));
app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));

// MONGO
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true, // make this also true
});

// Routers
app.get('/', (req, res) => { res.send('<h1>Hello world</h1>'); });
app.use(router);

// ErrorsHandler
app.use(responseHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Server started on port:', PORT));
