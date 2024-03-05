const express = require('express')

const uuid = require('uuid')
import cors from 'cors'

const port = 3001
const app = express()
app.use(express.json())
app.use(cors())

const orders = []

const checkOrdersID = (request, response, next) => {
    const {id} = request.params

    const index = orders.findIndex(order => order.id === id)

    if(index < 0){
        return response.status(404).json({error: "Order not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/orders', (request, response) => {
    return response.json(orders)
})

app.post('/orders', (request, response) => {
    const {order, clientName, price, status} = request.body

    const newOrder = { id: uuid.v4(), order, clientName, price, status }

    orders.push(newOrder)

    return response.status(201).json(orders)
})

app.put('/orders/:id', checkOrdersID, (request, response) => {

    const index = request.userIndex

    const id = request.userId

    const {order, clientName, price, status} = request.body

    const updateOrders = { id, order, clientName, price, status }

    orders[index] = updateOrders

    return response.json(updateOrders)

})

app.get('/orders/:id', (request, response) => {

    const orderResult = orders[index]

    return response.json(orderResult)
})

app.delete('/orders/:id', checkOrdersID, (request, response) => {

    const index = request.userIndex

    orders.splice(index, 1)

    return response.status(204).json(orders)
})


app.listen(port, () => {
    console.log(`🚀 Server is started on port ${port}`)
} )