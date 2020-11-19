const mongoose =require('mongoose');


const profile =new mongoose.Schema({
    uname: String,
    age: Number,
    gender: String,
    image: String,
    email: String
});

module.exports = Profile = mongoose.model('Profile', profile);