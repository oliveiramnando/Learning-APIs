require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.json({ message: "Hello from 11-rbac-permissions-api" })
})

mongoose
.connect(
    process.env.MONGO_URI
).then(() => {
    console.log("Connected!");
    app.listen(3000, () => {
        console.log("Server is running on PORT 3000!");
    })
});