
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('gifts', function(table) {
          table.text('gift');
        }),
      ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('gifts', function(table) {
          table.dropColumn('gift');
        }),
      ]);
};
