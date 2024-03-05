const express = require('express');
const uuid = require('uuid');
const cors = require('cors')

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors())

const users = []

const checkUsersID = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex(users => users.id === id)

    if(index < 0){
        return response.status(404).json({error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const {user, name, age} = request.body

    const newUser = { id: uuid.v4(), name, age}

    users.push(newUser)

    return response.status(201).json(users)
})

app.put('/users/:id', checkUsersID, (request, response) => {

    const index = request.userIndex

    const id = request.userId

    const {user, name, age} = request.body

    const updateUsers = { id, name, age}

    users[index] = updateUsers

    return response.json(updateUsers)

})

app.get('/users/:id', (request, response) => {

    const userResult = users[index]

    return response.json(userResult)
})

app.delete('/users/:id', checkUsersID, (request, response) => {

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json(users)
})


app.listen(port, () => {
    console.log(`🚀 Server is started on port ${port}`)
} )