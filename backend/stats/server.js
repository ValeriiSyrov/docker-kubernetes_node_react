const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Tasks = require('./tasks')

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

app.use(bodyParser.json())


app.get('/stats', async (req, res) => {
    try {
     
       const tasks = await Tasks.find({})
       const result = analyze(tasks) 
       res.json(result)
    } catch(e) {
        console.log(e)
    }
})


function analyze(tasks) {
    let result = {
      failed: 0,
      in_progress: 0,
      success: 0
    };
  
    tasks.map(el => {
      switch (el.status) {
        case "failed":
          result.failed += 1
          break;
        case "in progress":
          result.in_progress += 1
          break;
        case "success":
          result.success += 1
          break;
  
        default:
          break;
      }
    })
  
    return result
  }

app.listen(port, () => console.log(`Example app listening on port ${port}!`))