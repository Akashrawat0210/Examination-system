const express = require('express');
const router = express.Router();
const Mark = require('../models/Mark');

router.post('/bulk-entry', async (req, res) => {
  try {
    const marksData = req.body;
    const result = await Mark.insertMany(marksData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Other CRUD operations for marks can be added here

module.exports = router;
