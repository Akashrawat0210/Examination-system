const express = require('express');
const router = express.Router();
const BranchYear = require('../models/BranchYear');

router.get('/', async (req, res) => {
  try {
    const branchYear = await BranchYear.findOne();  // Assuming only one document for year and branch
    res.json(branchYear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CRUD operations for branch and year can be added here

module.exports = router;
