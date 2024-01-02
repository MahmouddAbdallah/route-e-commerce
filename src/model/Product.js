const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "category ",
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        unique: true,
    },
    price: {
        type: Number,
        required: true
    },
    oldPrice: {
        type: Number,
    },
    size: {
        type: [Number]
    },
    color: {
        type: [String]
    },
    description: {
        type: String,
    }
}, { timestamps: true });
const Product = mongoose.model("product", productSchema);
module.exports = Product