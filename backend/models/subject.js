const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true
  },
  branch: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
