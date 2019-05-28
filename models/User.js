const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    pseudo: String,
    age: Number,
    sexe: String,
    image: String,
    status: String

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
