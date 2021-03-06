const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Tasks = require('./tasks')

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL||'mongodb://localhost:27017/todo', {useNewUrlParser: true})
.then(()=>console.log("Connected to MongoDB"))
.catch((e)=>{
    console.log(e)
    process.exit()
});

app.use(bodyParser.json())


app.get('/suggest', async (req, res) => {
    try {
     
       const tasks = await Tasks.find({status:"failed"})
       
       res.json(tasks)
    } catch(e) {
        console.log(e)
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))