const express = require('express');
const middleware = require('./cars-middleware');
const router = express.Router();
const Cars = require('./cars-model');

router.get('/',
  async (req, res, next) => {
    try {
      const cars = await Cars.getAll();
      res.json(cars);
    } catch (error) {
      next(error);
    }
  });

router.get('/:id',
  middleware.checkCarId,
  async (req, res, next) => {
    res.json(req.car);
  });

router.post('/',
  [
    middleware.checkCarPayload,
    middleware.checkVinNumberUnique,
    middleware.checkVinNumberValid
  ],
  async (req, res, next) => {
    try {
      const data = await Cars.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  });

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;

