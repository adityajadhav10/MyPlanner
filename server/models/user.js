    
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  additionalInfo:[
    {
      age: {
        type: Number,
        required: true
      },
      gender: {
        type: String,
        required: true
      },
      bio: {
        type: String,
        required: true
      },
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

