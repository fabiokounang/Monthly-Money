const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const logItemSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date().getTime()
  }
});

logItemSchema.plugin(uniqueValidator);

const LogItem = mongoose.model('LogItem', logItemSchema);

module.exports = LogItem;