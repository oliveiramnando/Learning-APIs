require('dotenv').config();
const express = require('express'); // imports express library to file; looks for express module in node_moduels; storess main funciton/object in var express
const mongoose = require('mongoose');
const Product = require('./models/product.models.js'); // imports schema 
const app = express(); // exxpress() return s an express application object; app object represents enitre web server; app = core object used to configure and run server

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const mongoURI = `mongodb+srv://${username}:${password}@backend.gsquehj.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=backend`;

// app.listen(3000, () => { // starts server and listen on port 3000, second arg is callback funcntion that runs when sever starts
//     console.log('Server is running on port 3000')
// });

app.get('/', (req, res) => { // '/' is the default page, we want to throw out the response from server to the page;req - is whatever client sends server; res - whatever server sends back
    res.send("hello from node api"); //response is coming from node api; will send to browser
}); 

app.post('/api/products', async (req,res) => { // creates products
    try{
        const product = await Product.create(req.body); // whenever await is used, must use async; whenevr the req.body was you create an instance for that model
        res.status(200).json(product); //returning that product as response json; 200 == success; throws out that json product
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/products', async (req,res) => { // reads all products
    try {
        const products = await Product.find({}); // the brackets finds all the products. will be returning everything
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/products/:id', async (req,res) => { // searches for specific item by id
    try {
        const { id } = req.params; // uses destructor to get id from url
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//update product
app.put('/api/product/:id', async (req,res) => {
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body); // updates body with the req body

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        const updatedProduct = await Product.findById(id); // a check from data base
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// delete product
app.delete('/api/product/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({message: "product not found"});
        }
        res.status(200).json({message: "product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect(mongoURI) // after .net/ , i added Node-API for the collection name
.then(() => {
    console.log('Connected!'); // want to connect to databse and then connect to server, the other way is fine too
    app.listen(3000, () => { // starts server and listen on port 3000, second arg is callback funcntion that runs when sever starts
        console.log('Server is running on port 3000')
    });
});