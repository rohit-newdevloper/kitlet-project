exports.up = function (connection) {
	return connection.schema.dropTableIfExists('items').createTable('items', (itemsTable) => {
		itemsTable.increments('item_id').primary();
		itemsTable.string('title').notNullable();
		itemsTable.string('owner').references('users.username');
		itemsTable.string('category').references('categories.slug');
		itemsTable.text('body').notNullable();
		itemsTable.string('img_url').notNullable();
		itemsTable.boolean('is_available').notNullable();
		itemsTable.integer('price').notNullable();
		itemsTable.string('location').references('users.location');
	});
};

exports.down = function (connection) {
	return connection.schema.dropTable('items');
};
