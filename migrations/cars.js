
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cars', tbl=>{
      //creates id
      tbl.increments();
      //VIN (number)
      tbl.text("vin", 17).unique().notNullable();
      //make (text)
      tbl.text("make").notNullable();
      //model (text)
      tbl.text("model").notNullable();
      //mileage (number)
      tbl.float("mileage", 9).notNullable();
      //transmission type - optional (text)
      tbl.text("transmission");
      //status of title - optional (text)
      tbl.text("title");
  })
};

exports.down = function(knex) {
  
};
