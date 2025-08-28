require('dotenv').config();
const express = require('express'); 
const mongoose = require('mongoose');
const Product = require('./models/product.models.js'); 
const productRoute = require('./routes/product.route.js');
const app = express();


const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/products", productRoute); 


app.get('/', (req, res) => { 
    res.send("hello from node api");
}); 


mongoose
    .connect(
        `mongodb+srv://${username}:${password}@backend.gsquehj.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=backend`
    )
    .then(() => {
        console.log('Connected!'); 
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        });
});