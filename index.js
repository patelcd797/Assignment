
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./db/User');
const Profile = require('./db/Profile');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { profile } = require('console');
const nodemailer = require('nodemailer');


var url = 'mongodb+srv://webapp:webapp@cluster0.2jdgu.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to database!");
  }).catch(() => {
    console.log("Connection failed!");
  });

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.get('/', (req, res) => {
  
    res.send('Server is running.....');
})

// register

app.post('/register',async function (req, res) {
  User.findOne({ email: req.body.email },async function (err, user) {
      if (err) {
        return res.json({ "success": false, "msg": "err" });
      }

      if (user) {
      
        return res.json({ "success": false, "msg": "user existed" });
      }
      const user1 = new User({ 
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.fname,
        lastname: req.body.lname
       });
      await user1.save(function(err, userObj) {
         if (err) {
           return res.json({ "success": false, "msg": "err" });
         }

         res.json({ "success": true, "msg": "user created" });
      });
  });
 // return res.json({ "success": true, "msg": "user existed" });
})

//login

app.post('/login',(req,res)=>{
  User.findOne({ email: req.body.email },async function (err, user) {
    if (err) {
      
      return res.json({ "success": false, "msg": err });
    }
    if (user) {
      if(user.password == req.body.password)
        return res.json({ "success": true, "msg": "user existed" });
      else
        return res.json({"success":false, "msg":"user not existed"});
         
    }
    else 
     {
  
       return res.json({"success":false, "msg":"user not existed"});
     }
})
})



// forgot pssword
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'joker797joker797@gmail.com',
    pass: 'Patelcd@797'
  }
});

app.post('/forgotpassword',(req,res)=>{
  //var myaccount = User.findOne({ email: req.body.email });
  //console.log(myaccount);
  User.findOne({ email: req.body.email },async function (err, user) {
    if (err) {
      return res.json({ "success": false, "msg": err });
    }

    if (user) {
      
      var mailOptions = {
        from: 'joker797joker797@gmail.com',
        to: req.body.email,
        subject: 'About your Password',
        text: 'password of '+ req.body.email+' is' + user.password +'. have a good day' 
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.json({ "success": true, "msg": "user existed" });
    }
    else 
     {
       return res.json({"success":false, "msg":"user not existed"});
     }
   });
})


// user profile

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const upload = multer();
app.post("/profile",upload.single('file'), async (req,res,next) => {
   const {
    file,
    body: { name,uname,age,gender,email }
  } = req;

   const fileName = Date.now() + req.file.originalName;
  await pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/src/image/${fileName}`)
  );
   const uprofile =new Profile({
     uname:uname,
     age: age,
     gender:gender,
     image:fileName,
     email:email 
   });
   await uprofile.save(function(err, userObj) {
    if (err) {
      return res.json({ "success": false, "msg": "err" });
    }

    res.json({ "success": true, "msg": "user created profile created" });
 });
   
})


// profilec chek if it is exist or not 


app.post('/profilecheck',(req,res)=>{
  Profile.findOne({ email: req.body.email },async function (err, user) {
    if (err) {
      return res.json({ "success": false, "msg": err });
    }
    if (user) {
        return res.json({ "success": true, "msg": "user existed" });    
    }
    else 
     {
       return res.json({"success":false, "msg":"user not existed"});
     }
    })
})





















app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
