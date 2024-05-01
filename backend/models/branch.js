const mongoose = require('mongoose');

const branchYearSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('BranchYear', branchYearSchema);
