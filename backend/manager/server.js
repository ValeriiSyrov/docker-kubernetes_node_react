const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Tasks = require('./tasks')
const axios = require('axios')
const cors = require('cors')

const port = process.env.PORT || 3005
const SERVICE_URL = process.env.SERVICE_URL 

mongoose.connect(process.env.MONGO_URL||'mongodb://localhost:27017/todo', {useNewUrlParser: true})
.then(()=>console.log("Connected to MongoDB"))
.catch((e)=>{
    console.log(e)
    process.exit()
});

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/add', async (req, res) => {
    try {
       const task = await Tasks.create(req.body)
       res.json(task)
    } catch(e) {
        console.log(e)
    }
})

app.get("/suggest", (req, res) => {
    axios.get(SERVICE_URL + "/suggest")
        .then(response => {
            res.json(response.data);
        })
        .catch(err => {
            console.error("Error forwarding request:");
            console.error(err && err.stack || err);
            res.sendStatus(500);
        });
});


app.get('/list', async (req, res) => {
    try {
       const tasks = await Tasks.find({'status': {$not: {$eq : "failed"}}})
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