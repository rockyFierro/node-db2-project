const express = require('express');
const router = express.Router();
const Cars = require('./cars-model');

router.route('/api/cars')
  .get(
    (req,res,next) => {
      return Cars.getAll();
    }
  );

  module.exports = router;
  
