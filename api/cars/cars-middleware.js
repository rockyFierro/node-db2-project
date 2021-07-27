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
  const err = { status: 400 };
  const {
    vin, //required string
    make, //unique string
    model, // required string
    mileage, //required int
    title, //required string
  } = req.body;

  const required = { vin, make, model, mileage, title };

  for (const field in required) {
    if (field === undefined) {
      err.message = `${field} is missing`;
      next(err);
    } else {
      next();
    }
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

    if(taken){
      next({
        status: 400,
        message: `vin ${vin} already exists`,
      });
    }
  } catch (err) {
    next(err);
  }

}
