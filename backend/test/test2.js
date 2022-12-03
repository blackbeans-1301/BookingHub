const express = require("express");

const app = express();




app.get('/', (req, res) => {
    res.send('root')
    console.log('abc')
})



const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}.`);
})

