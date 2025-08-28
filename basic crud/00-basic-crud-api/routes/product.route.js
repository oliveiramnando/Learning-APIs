const express = require("express");
const Product = require("../models/product.models.js");
const router = express.Router();
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/product.controller.js');


router.post('/',createProduct);

router.get('/', getProducts);
router.get('/:id', getProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);


module.exports = router