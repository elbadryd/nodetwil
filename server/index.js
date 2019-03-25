const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config()
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/text', function (req, res) {
  client.messages
  .create({
     body: req.body.smsContent,
     from: '+15046084567',
     to: req.body.number,
   })
  .then(message => res.send(message))
  .catch(err =>{
    res.send(err)
  })
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

var transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  }
  
  var transporter = nodemailer.createTransport(transport)
  
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });

  app.post('/send', (req, res, next) => {
    console.log(req.body)
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var content = `name: ${name} \n email: ${email} \n message: ${message} `
  
    var mail = {
      from: name,
      to: email,  //Change to email address that you want to receive messages on
      subject: 'New Message from Contact Form',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })
app.listen(process.env.PORT || 8080);