const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Tasks = require('./tasks')

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/add', async (req, res) => {
     
    try {
       const task = await Tasks.create(req.body)
       res.json(task)
    } catch(e) {
        console.log(e)
    }
})


app.get('/list', async (req, res) => {
    try {
       const tasks = await Tasks.find({})
       res.json(tasks)
    } catch(e) {
        console.log(e)
    }
})


app.post('/changestatus', async (req, res) => {
    try {
       const {_id, status} = req.body
       const task = await Tasks.findOneAndUpdate({_id}, {status}, {new:true})
       res.json(task)
    } catch(e) {
        console.log(e)
    }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))