const express = require('express');
const  products = require('../controllers/products');
const router = express.Router();
const {isLoggedin, isSeller} = require('../middleware');

router.route('/')
    .get(products.renderIndex)
    .post(isLoggedin, products.createProduct)

router.get('/new',  isLoggedin, products.renderNewForm)

router.route('/:id')
    .get(products.showProduct)    
    .put(isLoggedin, isSeller, products.updateProduct)
    .delete(isLoggedin, isSeller, products.deleteProduct)  
    .post(isLoggedin, products.buyProduct)
  

router.get('/:id/edit', isLoggedin, isSeller, products.renderEditForm)

module.exports = router;