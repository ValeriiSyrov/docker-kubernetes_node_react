let mongoose = require('mongoose')

let Schema = new mongoose.Schema({
  task: String,
  status: String
}, 
{ versionKey: false }
)

module.exports = mongoose.model('Tasks', Schema)