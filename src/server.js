const express = require('express')
const pg = require('./db/')
const app = express()
const port = 3000

const ORDER_TABLE_FIELD_NAMES = ['firstName', 'lastName', 'streetName', 'streetNumber', 'postalCode', 'city', 'phone', 'items'];

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/orders', (req, res) => {
    const dbResponse = pg('orders').select();

    dbResponse.then(rows => {
        res.json({ method: 'GET', query: req.query, rows })
    })
})
app.post('/orders', (req, res) => {

    const errors = []
    const { firstName, lastName, streetName, streetNumber, postalCode, city, phone, items } = req.body

    ORDER_TABLE_FIELD_NAMES.forEach(field => {
        if ((field === 'items' && req.body.items && req.body.items.length === 0) || (!req.body[field])) {
            errors.push({
                field,
                description: 'Required field'
            });
        }
    })
    if (errors.length) {
        return res.json({ errors })
    }

    pg('orders').insert({
        status: "new",
        firstName,
        lastName,
        streetName,
        streetNumber,
        postalCode,
        city,
        phone,
        items: JSON.stringify(items)
    }, ['id']).then(row => {
        res.json({ status: 'success', response: row })
    }).catch(error => {
        res.json({ status: 'failure', error })
    })

})
app.get('/orders/:orderId', (req, res) => {
    const dbResponse = pg('orders').where({ 'id': req.params.orderId}).select();
    dbResponse.then(row => {
        res.json({ method: 'GET', params: req.params, row })
    });
})
app.put('/orders/:orderId', (req, res) => {
    const { status, firstName, lastName, streetName, streetNumber, postalCode, city, phone, items } = req.body
    const dbResponse = pg('orders').where({ 'id': req.params.orderId }).update({
        status, firstName, lastName, streetName, streetNumber, postalCode, city, phone, items: JSON.stringify(items)
    }, ['id', 'status'].concat(ORDER_TABLE_FIELD_NAMES));

    dbResponse.then(row => {
        res.json({ status: 'success', response: row })
    }).catch(error => {
        res.json({ status: 'failure', error, body: req.body})
    })
})
app.delete('/orders/:orderId', (req, res) => {
    const dbResponse = pg('orders').where({ 'id': req.params.orderId }).del();
    dbResponse.then((rowsDeleted) => {
        res.json({ status: 'success', orderId: req.params.orderId})//, rowsDeleted })
    }).catch(error => {
        res.json({ status: 'failure', error, orderId: req.params.orderId})
    })

})

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
