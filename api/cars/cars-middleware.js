const database = require('../../data/db-config.js');
const Cars = require('./cars-model');
const vinCheck = require('vin-validator');

exports.checkCarId = async (req, res, next) => {
  try {
    const carID = await Cars.getById(req.params.id);
    if (!carID) {
      next({
        status: 400,
        message: `vim ${req.params.id} is invalid`
      });
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
    next({
      status: 400,
      message: 'vin is missing',
    });
  } else if (!make) {
    next({
      status: 400,
      message: 'make is missing',
    });
  } else if (!model) {
    next({
      status: 400,
      message: 'model is missing',
    });
  } else if (!title) {
    next({
      status: 400,
      message: 'title is missing',
    });
  } else if (!mileage) {
    next({
      status: 400,
      message: 'mileage is missing',
    });
  } else {
    next();
  }
};

exports.checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  const realVin = vinCheck.validate(vin);

  if (realVin === false) {
    next({
      status: 400,
      message: `Vin ${vin} is invalid`,
    });
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
