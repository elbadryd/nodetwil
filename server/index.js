const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config()
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilclient = require('twilio')(accountSid, authToken);

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://elbadryd:${process.env.MONGO_PW}@cluster0-mclid.mongodb.net/test?retryWrites=true`;
const DATABASE_NAME = "my_cluster";

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(collection)
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('mongo connected')
//   }
//   client.close();
// });



app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/text', function (req, res) {
  twil.messages
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
app.post('/receive', (req, res) => {
  if (req.body.Body === '1') {
  twilclient.messages
  .create({
     body: 'your message was received',
     from: '+15046084567',
     to: req.body.From,
   })
  }
})

app.get('/*', function (req, res) {
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
app.listen(8080, () => {
  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        console.log(error)
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("people");
    console.log("Connected to `" + DATABASE_NAME + "`!");
    })
  }
);