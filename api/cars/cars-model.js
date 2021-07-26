const database = require('../../data/db-config')

const getAll = () => {
  return database
    .select()
    .table('cars');
};

const getById = (id) => {
  return database
    .select()
    .table('cars')
    .where('id', id);
};

const create = async (car) => {
  const [id] = await database
    .table('cars')
    .insert(car);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create
};