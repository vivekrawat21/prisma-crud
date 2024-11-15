const express = require('express');
const cookieparser = require('cookie-parser')
require('dotenv').config()

const app = express();

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieparser());

const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
app.use('/api', userRouter);
app.use('/api', postRouter);

app.get("/", (req, res) => {
    res.send("Hello people");
})



app.listen(3000, () => {
    console.log("server is running on port 3000");
})