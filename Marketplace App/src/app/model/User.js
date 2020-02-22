const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createrAt: {
    type: Date,
    default: Date.now
  }
})
module.export = mongoose.model('User', UserSchema)
