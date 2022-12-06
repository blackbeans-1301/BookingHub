const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
	origin: "*",
    method: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use(require("./app_2/middleware/middleware.js").UpdateDatabase)

app.get("/", (req, res) => {
    res.json({message:"H3L2 Sever!!!!!!!!"});
});

app.use("/user", require("./app_2/routers/user.router.js"))
app.use("/hotel", require("./app_2/routers/hotel.router.js"))
app.use("/room", require('./app_2/routers/room.router.js'))
app.use("/reservation", require("./app_2/routers/reservation.router.js"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}.`);
})


const db = require("./app_2/models")
//db.sequelize.sync({ force: true });
db.sequelize.sync();
//db.sequelize.sync({ alter: true });

