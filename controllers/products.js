const Product = require('../models/product');
const catchAsync = require('../utils/catchAsync')
const categories = require('../utils/categories')
const User = require('../models/user')


module.exports.renderIndex = catchAsync(async (req, res) => {
    const {category} = req.query;
    if(category){
        const products = await Product.find({category, available: true});
        res.render('products/index', {products, category});
    }
    else{
        const products = await Product.find({available: true});
        res.render('products/index', {products, category: 'all'});
    }
})

module.exports.createProduct = catchAsync(async (req, res) => {
    const product = new Product(req.body.product);
    product.seller = req.user._id;
    await product.save();
    const user = await User.findById(req.user._id);
    user.own_products.push(product._id);
    await user.save();
    req.flash('success', 'successfully created your product');
    res.redirect('/products');
})

module.exports.renderNewForm = catchAsync((req, res) => {
    res.render('products/new', {categories});
})

module.exports.showProduct = catchAsync(async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate('seller').populate('buyer');
    if(!product){
        req.flash('error', 'product not found');
        return res.redirect('/products')
    }
    res.render('products/show', {product});
})

module.exports.renderEditForm = catchAsync(async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        req.flash('error', 'product not found');
        return res.redirect('/products')
    }
    res.render('products/edit', {product, categories});
})

module.exports.updateProduct = catchAsync(async (req, res) => {
    const {id} = req.params;
    await Product.findByIdAndUpdate(id, req.body.product);
    req.flash('success', 'successfully updated your product');
    res.redirect(`/products/${id}`);
})

module.exports.deleteProduct = catchAsync(async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    await User.findByIdAndUpdate(product.seller, {$pull : {own_products : product._id}})
    req.flash('success', 'successfully deleted your product');
    res.redirect('/products');
})

module.exports.buyProduct = catchAsync(async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    product.available = false;
    product.buyer = req.user._id;
    product.save();
    const user = await User.findById(req.user._id);
    user.bought_products.push(product._id);
    await user.save();
    req.flash('success', 'successfully bought your product');
    res.redirect(`/products/${id}`);
})