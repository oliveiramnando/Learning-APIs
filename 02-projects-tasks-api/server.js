require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const db_password = process.env.DB_PASSWORD;

mongoose
.connect(
   `mongodb+srv://oliveiramnando:${db_password}@projectsntasks.fjbkni3.mongodb.net/?retryWrites=true&w=majority&appName=projectsNtasks`
)
.then(() => {
    console.log('Connected!');
    app.listen(3000, () => {
        console.log('Server is running on port 3000!');
    })
});