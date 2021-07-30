const database = require('../../data/db-config');

const getAll = () => {
  return database('cars');
};

const getById = (id) => {
  return database('cars')
    .select('make','model','mileage','title','transmission','vin')
    .where('id', id)
    .first();
};

const create = async (car) => {
  const [id] = await
    database('cars')
      .insert(car);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create
};