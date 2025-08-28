require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const projectRoute = require('./routes/project.routes.js')
const taskRoute = require('./routes/task.routes.js');
const userRoute = require('./routes/user.routes.js');

const app = express();

const db_password = process.env.DB_PASSWORD;

// middleware
app.use(express.json());

// routes
app.use('/projects', projectRoute);
app.use('/projects/:ProjectId/tasks', taskRoute);
app.use('/user/', userRoute);

app.get('/', (req,res) => {
    res.send("Hello from 02-projects-tasks-api");
})

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