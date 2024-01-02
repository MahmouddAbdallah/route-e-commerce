const mongoose = require("mongoose")
const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "user",
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true,
    }
},
    { timestamps: true })
const Cart = mongoose.model('Carts', CartSchema)
module.exports = Cart