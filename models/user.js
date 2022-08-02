const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    own_products: [{
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    }],
    bought_products: [{
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    }]
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
