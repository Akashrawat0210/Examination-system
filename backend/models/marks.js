const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  internal: {
    type: Number,
    default: null
  },
  external: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model('Mark', markSchema);
