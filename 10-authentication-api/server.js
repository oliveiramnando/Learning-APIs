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

const db_password = process.env.DB_PASSWORD;

app.get('/', (req,res) => {
    res.json({ message: "Hello from 10-authentication-api" })
})

mongoose
.connect(
    `mongodb+srv://oliveiramnando:${db_password}@cluster0.lfrgmzj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
)
.then(() => {
    console.log('Connected!');
    app.listen(3000, () => {
        console.log('Server is running on port 3000!');
    })
});
