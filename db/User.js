const mongoose = require('mongoose');

const user =new mongoose.Schema({
    firstname: String,     
    lastname: String,
    email: String,
    password: String
    
});


module.exports = User = mongoose.model('User',user);