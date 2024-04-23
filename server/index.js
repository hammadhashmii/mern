const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crud")

// create user api

app.post("/createUsers", (req,res) =>  {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

// get user api

app.get("/getuser/:id", (req,res) =>  {
    const id = req.params.id
    UserModel.findById({_id:id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})  

// update user api 

app.put("/updateUsers/:id", (req,res) =>  {
    const id = req.params.id
    UserModel.findByIdAndUpdate({_id:id} , {name: req.body.name, email: req.body.email, age: req.body.age})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})  

// delete user api 

app.delete("/deleteusers/:id", (req,res) =>  {
    const id = req.params.id
    UserModel.findByIdAndDelete({_id:id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


app.get("/", (req,res) =>  {
    UserModel.find(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running");
})