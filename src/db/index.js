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
            t.timestamp('createdAt');
            t.timestamp('lastUpdated');
            t.string('firstName');
            t.string('lastName');
            t.string('streetName');
            t.string('streetNumber');
            t.string('postalCode');
            t.string('city');
            t.string('phone');
            t.json('items');
            t.enu('status', ['new', 'preparing', 'delivering', 'delivered'], { useNative: true, enumName: 'order_status_type' })
        });
    }
});

module.exports = pg;
