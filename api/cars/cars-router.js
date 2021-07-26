const express = require('express');
const router = express.Router();
const Cars = require('./cars-model');

router.route('/')
  .get(
    async (req, res, next) => {
      try {
        const cars = await Cars.getAll();
        res.json(cars);
      } catch (error) {
        next(error);
      }
    })

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;

