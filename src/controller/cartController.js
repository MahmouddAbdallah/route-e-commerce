const Cart = require("../model/Cart");
const User = require("../model/User");

exports.createCart = async (req, res) => {
    try {
        const { user, product } = req.body;
        if (user) {
            if (product) {
                const isUser = await User.findById(user)
                if (isUser) {
                    const cart = await Cart.create({
                        user,
                        product
                    })
                    return res.status(201).json({ cart });
                }
                else {
                    return res.status(400).json({ error: "Invaild user" })
                }
            } else {
                return res.status(400).json({ error: "Please provide a product" })
            }
        } else {
            return res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.fetchCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).json({ message: 'cart Not Found' });
        }
        return res.status(200).json({ cart });
    } catch (error) {
        res.staus(400).json({ error: error.message })
    }
}
exports.deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findByIdAndDelete(id);
        if (!cart) {
            return res.status(404).json({ message: 'cart Not Found' });
        }
        return res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        res.staus(400).json({ error: error.message })
    }
}
exports.fetchCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.find({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart Not Found' });
        }
        return res.status(200).json({ cart });
    } catch (error) {
        res.staus(400).json({ error: error.message })
    }
}
