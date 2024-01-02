const Product = require("../model/Product");
const User = require("../model/User");
const FeatureAPI = require("../utils/featursAPI");

exports.createProduct = async (req, res) => {
    try {
        const { user, category, title, price, size, color, description, oldPrice } = req.body;
        const files = req.files;
        const fileNames = files.map(file => `http://localhost:8000/${file.filename}`);
        console.log(fileNames);
        if (user) {
            if (title) {
                if (fileNames) {
                    if (category) {
                        if (price) {
                            if (size.length != 0) {
                                if (color.length != 0) {
                                    if (description) {
                                        const isUser = await User.findById(user)
                                        if (isUser) {
                                            const product = await Product.create({
                                                user,
                                                category,
                                                title,
                                                images: fileNames,
                                                price,
                                                size,
                                                color,
                                                description,
                                                oldPrice
                                            })
                                            return res.status(201).json({ product });
                                        }
                                        else {
                                            return res.status(400).json({ error: "Invaild user" })
                                        }
                                    } else {
                                        return res.status(400).json({ error: "description is required" });
                                    }
                                } else {
                                    return res.status(400).json({ error: "Color field is required" });
                                }
                            } else {
                                return res.status(400).json({ error: "Size field is required" });
                            }
                        } else {
                            return res.status(400).json({ message: "Price is required" });
                        }
                    } else {
                        return res.status(400).json({ message: "Category is required" });
                    }
                } else {
                    return res.status(400).json({ error: "Please provide a image" })
                }
            } else {
                return res.status(400).json({ error: "Please provide a title" })
            }
        } else {
            return res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.fetchProducts = async (req, res) => {
    try {
        const productAPI = new FeatureAPI(req, Product)
            .filter()
            .sort()
            .fields()
            .search()

        const products = await productAPI.Model
        res.status(200).json({ products })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(200).json({ error: "This product not here" })
        }
        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.updateProduct = async (req, res) => {
    try {
        const { ...body } = req.body;
        const { id } = req.params
        const isProduct = await Product.findById(id)
        if (isProduct) {
            const product = await Product.findByIdAndUpdate(id,
                { ...body },
                { new: true });
            return res.status(200).json({ product })
        }
        else {
            return res.status(400).json({ error: "Invaild product" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.fetchProductsByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const product = await Product.find({ category: categoryId })
        if (!product) {
            return res.status(200).json({ error: "This product not here" })
        }
        return res.status(200).json({ product })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}