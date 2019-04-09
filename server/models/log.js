const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const logSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  logItem: {
    type: Schema.Types.ObjectId,
    ref: 'LogItem'
  }
});

logSchema.plugin(uniqueValidator);

const Log = mongoose.model('Log', logSchema);

module.exports = Log;