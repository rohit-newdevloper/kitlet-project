const { categoryData, itemData, requestData, usersData, messagesData } = require('../data/dev-data');

exports.seed = function (knex) {
	return knex.migrate
		.rollback()
		.then(() => knex.migrate.latest())
		.then(() => {
			const categoryInsert = knex.insert(categoryData).into('categories');
			const usersInsert = knex.insert(usersData).into('users');
			return Promise.all([ categoryInsert, usersInsert ]);
		})
		.then(() => {
			return knex.insert(itemData).into('items');
		})
		.then(() => {
			return knex.insert(requestData).into('requests');
		})
		.then(() => {
			return knex.insert(messagesData).into('messages');
		});
};
