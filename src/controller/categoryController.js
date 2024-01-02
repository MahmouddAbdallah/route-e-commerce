const Category = require("../model/Category");
const User = require("../model/User");
const FeatureAPI = require("../utils/featursAPI");

exports.createCategory = async (req, res) => {
    try {
        const { user, title, description } = req.body;
        if (user) {
            if (title) {
                if (req.file.filename) {
                    const isUser = await User.findById(user)
                    if (isUser) {
                        const category = await Category.create({
                            user,
                            title,
                            image: `http://localhost:8000/${req.file.filename}`,
                            description
                        })
                        return res.status(201).json({ category });
                    }
                    else {
                        return res.status(400).json({ error: "Invaild user" })
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
exports.fetchCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category Not Found' });
        }
        return res.status(200).json({ category });
    } catch (error) {
        res.staus(400).json({ error: error.message })
    }
}
exports.fetchCategories = async (req, res) => {
    try {
        const categoriesAPI = new FeatureAPI(req, Category)
            .filter()
            .sort()
            .fields()
            .search()

        const categories = await categoriesAPI.Model
        res.status(200).json({ categories })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.updateCategory = async (req, res) => {
    try {
        const { ...body } = req.body;
        const { id } = req.params
        const isCategory = await Category.findById(id)
        if (isCategory) {
            const category = await Category.findByIdAndUpdate(id,
                { ...body },
                { new: true });
            return res.status(200).json({ category })
        }
        else {
            return res.status(400).json({ error: "Invaild category" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id)
        if (!category) {
            return res.status(200).json({ error: "This category not here" })
        }
        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}