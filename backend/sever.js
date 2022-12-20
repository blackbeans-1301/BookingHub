const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')
const cors = require("cors")
require('dotenv').config()
const app = express()

var corsOptions = {
    origin: "*",
    method: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(require("./app_2/middleware/middleware.js").UpdateDatabase)

app.get("/", (req, res) => {
    res.json({ message: "H3L2 Sever!!!!!!!!" })
})

app.use("/api/user", require("./app_2/routers/user.router.js"))
app.use("/api/hotel", require("./app_2/routers/hotel.router.js"))
app.use("/api/room", require('./app_2/routers/room.router.js'))
app.use("/api/reservation", require("./app_2/routers/reservation.router.js"))
app.use("/api/comment", require("./app_2/routers/comment.router.js"))
app.use("/api/bill", require("./app_2/routers/bill.router.js"))

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}.`)
})


const db = require("./app_2/models")
// db.sequelize.sync({ force: true })
// db.sequelize.sync();
db.sequelize.sync({ alter: true });


