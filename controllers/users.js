const catchAsync = require("../utils/catchAsync");
const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = catchAsync(async (req, res) => {
    try{
        const {username, password, email} = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, password);
        const redirectUrl = req.session.returnTo || '/';
        req.login(registeredUser, (err) =>{
            if(err) return next(err);
            req.flash('success', 'Welcome to Shopee');
            res.redirect(redirectUrl);
        })
    }
    catch(err){
        req.flash('error', err.message);
        res.redirect('/register');
    }
})


module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}


module.exports.login = (req, res) => {
    req.flash('success', 'successfully logged in');
    const redirectUrl = req.session.returnTo || '/';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout(function(err) {
        if(err) return next(err);  
        req.flash('success', 'successfully logged out');
        res.redirect('/');  
    })
}

module.exports.showProducts = catchAsync( async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id).populate('own_products').populate('bought_products');
    res.render('users/showProducts', {user});
})