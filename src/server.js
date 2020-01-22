const express = require('express')
const pg = require('./db/')
const app = express()
const port = 3000

const ORDER_TABLE_FIELD_NAMES = ['firstName', 'lastName', 'streetName', 'streetNumber', 'postalCode', 'city', 'phone', 'items'];

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/orders', (req, res) => {
    const { filterStatus: status, filterCustomer: customer } = req.query
    const customerFilterString = `LOWER("firstName" || ' ' || "lastName") LIKE '%${customer.toLowerCase()}%'`
    let query = pg('orders').select()

    if (status && customer) {
        query = query.where({ status }).andWhereRaw(customerFilterString)
    } else if (status) {
        query = query.where({ status })
    } else if (customer) {
        query = query.whereRaw(customerFilterString)
    }

    query.then(rows => {
        res.json({ status: 'success', response: rows })
    }).catch(error => {
        res.json({ status: 'failure', errors: [error] })
    })
})
app.post('/orders', (req, res) => {
    const orderValues = { status: "new" }
    const errors = []

    ORDER_TABLE_FIELD_NAMES.forEach(field => {
        if ((field === 'items' && req.body.items && req.body.items.length === 0) || (!req.body[field])) {
            errors.push({ field, description: 'Required field' });
        }
    })
    if (errors.length) {
        return res.json({ status: 'failure', errors })
    }

    ORDER_TABLE_FIELD_NAMES.forEach(field => {
        if (field === 'items') {
            orderValues[field] = JSON.stringify(req.body[field])
        } else {
            orderValues[field] = req.body[field]
        }
    })

    pg('orders').insert(orderValues, ['id']).then(row => {
        res.json({ status: 'success', response: row })
    }).catch(error => {
        res.json({ status: 'failure', errors: [error] })
    })

})
app.get('/orders/:orderId', (req, res) => {
    const query = pg('orders').where({ 'id': req.params.orderId}).select();
    query.then(row => {
        res.json({ status: 'success', response: row })
    }).catch(error => {
        res.json({ status: 'failure', errors: [error] })
    })
})
app.put('/orders/:orderId', (req, res) => {
    const updatedOrderValues = {}
    const query = pg('orders').where({ 'id': req.params.orderId })
    const returnedColumns = ['id', 'status'].concat(ORDER_TABLE_FIELD_NAMES)

    returnedColumns.slice(1).forEach(field => {
        if (field === 'items' && req.body[field]) {
            updatedOrderValues[field] = JSON.stringify(req.body[field])
        } else if (req.body[field]) {
            updatedOrderValues[field] = req.body[field]
        }
    })

    query.update(updatedOrderValues, returnedColumns).then(row => {
        res.json({ status: 'success', response: row })
    }).catch(error => {
        res.json({ status: 'failure', errors: [error] })
    })
})
app.delete('/orders/:orderId', (req, res) => {
    const query = pg('orders').where({ 'id': req.params.orderId }).del();

    query.then((rowsDeleted) => {
        res.json({ status: 'success' })//, rowsDeleted })
    }).catch(error => {
        res.json({ status: 'failure', errors: [error] })
    })

})

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
