
exports.up = function(knex, Promise) {
return Promise.all([
    knex.schema.table('users', function(table) {
      table.text('defaultmessage');
    }),
  ]);  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumn('defaultmessage');
    }),
  ]);
};
