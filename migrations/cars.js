exports.up = function (knex, Promise) {
  return knex.schema.createTable("cars", (tbl) => {
    //creates id
    tbl.increments();
    //VIN (number)
    tbl.string("vin", 17).notNullable();
    //make (string)
    tbl.string("make").notNullable();
    //model (string)
    tbl.string("model").notNullable();
    //mileage (number)
    tbl.float("mileage", 9).notNullable();
    //transmission type - optional (string)
    tbl.string("transmission");
    //status of title - optional (string)
    tbl.text("title");
  });
};

exports.down = function (knex, Promise) {
  return sknex.schema.dropTableIfExists("cars");
};
