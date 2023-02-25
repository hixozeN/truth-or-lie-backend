const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
//const factRouter = require('./routes/factRouter')
const url = 'mongodb://root:Staples_123@fotrigooguem.beget.app/project';
const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json());
app.use('/auth', authRouter);
//app.use('/facts', factRouter);

const start = async () => {
  try {
    await mongoose.connect(url)
    app.listen(PORT, () => console.log('Server started on port', PORT));
  } catch (e) {
    console.log(e);
  }
}

start();
