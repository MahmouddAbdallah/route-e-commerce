const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User.js')
exports.signup = async (req, res) => {
    try {
        const { name, username, email, phone, password } = req.body;
        if (name) {
            if (username) {
                if (email) {
                    if (phone) {
                        if (password) {
                            const user = await User.findOne({ email });
                            if (!user) {
                                const isUsername = await User.findOne({ username });
                                if (!isUsername) {
                                    const newUser = await User.create({
                                        name,
                                        username: username.toLowerCase(),
                                        email: email.toLowerCase(),
                                        phone,
                                        password: await bcrypt.hash(password, 10),
                                    })
                                    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
                                    return res.status(201).json({ message: "User has been created!", token: token, user: newUser })
                                } else {
                                    return res.status(401).json({ error: "The username already exists" });
                                }
                            } else {
                                return res.status(401).json({ error: "Email already in use" });
                            }
                        } else {
                            return res.status(401).json({ error: "Password number is required" })
                        }
                    } else {
                        return res.status(401).json({ error: "Phone number is required" })
                    }
                } else {
                    return res.status(401).json({ error: 'Email is required' })
                }
            } else {
                return res.status(401).json({ error: "Username is required" });
            }
        } else {
            return res.status(401).json({ error: "Name field is required" });
        }
    } catch (error) {
        res.status(401).json({ error: error })
    }
}
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email) {
            if (password) {
                const user = await User.findOne({ email });
                if (user) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (isMatch) {
                        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
                        res.status(200).json({ message: "Sign in successfully", token, user })
                    } else {
                        return res.status(401).json({ error: "Invalid Password" })
                    }
                } else {
                    return res.status(401).json({ error: "This email is new please signUp" });
                }
            } else {
                return res.status(401).json({ error: "Password number is required" })
            }
        } else {
            return res.status(401).json({ error: 'Email is required' })
        }
    } catch (error) {
        res.status(401).json({ error: error })
    }
}