const User = require("../model/User");
const FeatureAPI = require("../utils/featursAPI");

exports.updateUser = async (req, res) => {
    try {
        const { ...body } = req.body;
        const { userId } = req.params
        const isUser = await User.findById(userId)
        if (isUser) {
            const user = await User.findByIdAndUpdate(userId, { ...body }, { new: true });
            return res.status(200).json({ user })
        }
        else {
            return res.status(400).json({ error: "Invaild user" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.fetchUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId)
        if (user) {
            return res.status(200).json({ user })
        }
        else {
            return res.status(400).json({ error: "Invaild user" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.fetchUsers = async (req, res) => {
    try {
        const userAPI = new FeatureAPI(req, User)
            .filter()
            .sort()
            .fields()
            .search()

        const users = await userAPI.Model
        return res.status(200).json({ users })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId)
        if (!user) {
            return res.status(200).json({ error: "This user not here" })
        }
        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}