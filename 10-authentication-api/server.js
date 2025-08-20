require('dotenv').config();

const express = require('express');
const mongoose =require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.json({ message: "Hello from 10-authentication-api" })
})

mongoose
.connect(
    process.env.MONGO_URI
)
.then(() => {
    console.log('Connected!');
    app.listen(3000, () => {
        console.log('Server is running on port 3000!');
    })
});
