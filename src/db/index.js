const pg = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        database: 'api'
    }
});

pg.schema.hasTable('orders').then(function (exists) {
    if (!exists) {
        return pg.schema.createTable('orders', function (t) {
            t.increments('id').primary();
            t.timestamp('createdAt').defaultTo(pg.fn.now());
            t.timestamp('lastUpdated').defaultTo(pg.fn.now());
            t.string('firstName');
            t.string('lastName');
            t.string('streetName');
            t.string('streetNumber');
            t.string('postalCode');
            t.string('city');
            t.string('phone');
            t.string('cardNumber');
            t.string('expirationMonth');
            t.string('expirationYear');
            t.string('securityCode');
            t.json('items');
            t.integer('total');
            t.enu('status', ['new', 'preparing', 'delivering', 'delivered']).defaultTo('new');
        });
    }
});

module.exports = pg;
