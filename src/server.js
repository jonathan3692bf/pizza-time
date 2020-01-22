const express = require('express')
const pg = require('./db/')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/orders', (req, res) => {
    res.json({method: 'GET', query: req.query})
})
app.post('/orders', (req, res) => {
    res.json(req.body)
})
app.get('/orders/:orderId', (req, res) => {
    res.json({ method: 'GET', params: req.params})
})
app.put('/orders/:orderId', (req, res) => {
    res.json({ method: 'PUT', body: req.body, params: req.params })
})
app.delete('/orders/:orderId', (req, res) => {
    res.json({ method: 'DELETE', params: req.params })
})

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
