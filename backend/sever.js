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

app.get("/", (req, res) => {
    res.json({message:"N2H3 Sever!!!!!!!!"});
});

app.use("/user", require("./app/routers/user.router.js"))
app.use("/hotel", require("./app/routers/hotel.router.js"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}.`);
})

// chay database
const db = require("./app/models")
db.sequelize.sync({ alter: true });
// db.sequelize.sync();