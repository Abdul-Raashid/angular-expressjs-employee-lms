// models/user.model.ts
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'trainer' } // Default role is 'trainer'
});

const User = mongoose.model('User', userSchema);
module.exports = User;