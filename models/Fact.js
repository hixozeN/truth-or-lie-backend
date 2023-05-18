const { Schema, model } = require('mongoose');

const Fact = new Schema(
  {
    question: {
      type: String,
      required: true,
      minlength: [10, 'text'],
      maxlength: [360, 'text'],
    },
    answer: {
      type: String,
      required: true,
      minlength: [10, 'text'],
      maxlength: [425, 'text'],
    },
    isTrue: { type: Boolean, required: true },
    isVerified: { type: Boolean, default: true },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = model('Fact', Fact);
