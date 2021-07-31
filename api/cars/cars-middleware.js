const database = require('../../data/db-config.js');
const Cars = require('./cars-model');
const vinCheck = require('vin-validator');

exports.checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if (!car) {
      res.status(404).json({message: `car with id ${req.params.id} is not found`});
      next();
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
}

exports.checkCarPayload = (req, res, next) => {
  const {
    vin,
    make,
    model,
    title,
    mileage
  } = req.body;

  if (!vin) {
    res.status(400).json({message: 'vin is missing'});
    next();
  } else if (!make) {
    res.status(400).json({message: 'make is missing'});
    next();
  } else if (!model) {
    res.status(400).json({message: 'model is missing'});
    next();
  } else if (!title) {
    res.status(400).json({message: 'title is missing'});
    next();
  } else if (!mileage) {
    res.status(400).json({message: 'mileage is missing'});
    next();
  } else {
    next();
  }
};

exports.checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  const realVin = vinCheck.validate(vin);

  if (realVin === false) {
    res.status(400).json({message:`vin ${vin} is invalid`});
    next();
  } else {
    next();
  }
}

exports.checkVinNumberUnique = async (req, res, next) => {
  try {
    const { vin } = req.body;
    const taken = await
      database
        .table('cars')
        .where('vin', vin)
        .first();

    if (taken) {
      next({
        status: 400,
        message: `vin ${req.body.vin} already exists`,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }

}
