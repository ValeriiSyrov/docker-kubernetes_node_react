const express = require('express')
const app = express()
const port = 3050
const path = require('path')

app.use(express.static(path.join(__dirname, '../build')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../build/index.html')))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))