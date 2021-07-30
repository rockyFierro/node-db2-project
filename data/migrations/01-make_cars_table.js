exports.up = function (knex) {
  return knex.schema.createTable('cars', table => {
    table.increments(); //primary key = id
    table.string('vin').notNullable();
    table.string('make').unique().notNullable();
    table.string('model').notNullable();
    table.integer('mileage').unsigned().notNullable();
    table.string('title').notNullable();
    table.string('transmission');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
