const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    }
}, { timestamps: true });
const Category = mongoose.model("category", categorySchema);
module.exports = Category