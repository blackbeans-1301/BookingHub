var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kk19elevanhuy@gmail.com',
    pass: 'sillaoddjtendxup'
  }
});

var mailOptions = {
  from: 'kk19elevanhuy@gmail.com',
  to: 'nguyenloan15062002@gmail.com',
  subject: 'Sending Email using Node.js',
  html: `<h1>hello</h1>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


// var x = ["a", "b"]

// var c = []

// for (var i = 0; i <= x.length; i++) {
//   c.push()
// }

// console.log(c);