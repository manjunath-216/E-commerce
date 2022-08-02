const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    category: {
        type: String,
        required: [true, 'description cannot be empty']
    },
    description: {
        type: String,
        required: [true, 'description cannot be empty']
    },
    image: {
        type: String,
        required: [true, 'image url cannot be empty']
    },
    price: {
        type: [Number, 'price must be a number'],
        required: [true, 'price cannot be empty'],
        min: [0, 'price cannot be negative']
    },
    available: {
        type: Boolean,
        default: true
    },
    seller: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    buyer: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
})

productSchema.index({name: 'text', description: 'text'});

module.exports = mongoose.model('Product', productSchema);