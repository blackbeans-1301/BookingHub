const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRound = 10;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:8000"],
        methods: ['GET', 'POST'],
        credentials: true
    })
);

app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "bookingHub"
});

app.post('/register', (req, res) => {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRound, (err, hash) => {
        if (err) {
            console.log('err', err);
        }

        db.query("INSERT INTO Accounts (fullname, username, email, password) VALUES (?, ?, ?, ?)", 
        [fullname, username, email, hash], 
        (err, result) => {
            console.log('err', err);
            // console.log('result', result);
        })
    })

    
    // console.log('res', res);
})

app.get("/login", (req, res) => {
    if(req.session.user) {
        res.send({
            loggedIn: true,
            user: req.session.user
        })
    } else {
        res.send({
            loggedIn: false
        })
    }
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM Accounts WHERE username = ?;", 
    username, 
    (err, result) => {
        if (err) {
            res.send({err: err})
        } 
        
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(result);
                } else {
                    res.send({message: "Wrong username/ password"})
                }
            })
        } else {
            res.send({message: "User doesn't exist"})
        }
        // console.log('result', result);
    })
    // console.log('res', res);
})

app.listen(3000, () => {
  console.log("running backend");
});
