
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('gifts', function(table) {
          table.increments('id').primary();
          table.string('item');
          table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
          table.string('donor');
          table.text('psmessage');
        }),
      ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('gifts'),
      ]);
};
