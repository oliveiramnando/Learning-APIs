require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');

const authRouter = require('./routers/authRouter.js');
const rbacRouter = require('./routers/rbacRouter.js');
const userRouter = require('./routers/userRouter.js');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/rbac', rbacRouter);
app.use('/api/user', userRouter);

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