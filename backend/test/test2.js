const express = require("express");

const app = express();


app.use((req,res,next) => {
    console.log("aaa")
    next();
})

app.get('/', (req, res) => {
    res.send('root')
})

app.get('/api/abc', (req, res) => {
    res.send('about')
  })

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}.`);
})

