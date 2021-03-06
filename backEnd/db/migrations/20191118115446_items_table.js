exports.up = function (connection) {
	return connection.schema.createTable('items', (itemsTable) => {
		itemsTable.increments('item_id').primary();
		itemsTable.string('title').notNullable();
		itemsTable.string('owner').references('users.username');
		itemsTable.string('category').references('categories.slug');
		itemsTable.text('body').notNullable();
		itemsTable.string('img_url').notNullable();
		itemsTable.boolean('is_available').notNullable();
		itemsTable.integer('requested').defaultsTo(0);
		itemsTable.integer('price').notNullable();
		itemsTable.string('location');
	});
};

exports.down = function (connection) {
	return connection.schema.dropTable('items');
};
