const { response } = require('express')
const express = require('express')
const uuid = require('uuid')
const port = 3000
const server = express()
server.use(express.json())

const users = []

server.get('/users', (req, res)=>{
    return res.json(users)
})

server.post('/users', (req,res)=>{

    const { name,age } = req.body

    const user = {id:uuid.v4(), name, age}
    users.push(user)
    return res.status(201).json(user)
})
server.put('/users/:id', (req, res)=>{
    const {id}= req.params
    const {name,age}= req.body

   const updateUser = {id, name, age}

    const index = users.findIndex(user => user.id === id)

    
    if(index < 0){
        return res.status(404).json({message:'User not Found'})
    }
    users[index] = updateUser
    
    return res.json(updateUser)
})

server.delete('/users/:id', (req, res)=>{
    const {id} = req.params

    const index = users.findIndex(user = user.id === id)

    if(index < 0 ){
        return res.status(404).json({message:'User not Found'})
    }

    users.splice(index,1)

    return res.status(204).json()
})

server.listen(port, ()=> console.log('🎉🎉🆗 Server on port 3000'))