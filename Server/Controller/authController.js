const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');

const registerNewUser = async (req, res, next) => {
    const { password, name, email } = req.body;

    try {
        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User With Email Already Exists' });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        let newUser = new User({
            name,
            email,
            password: hashedPass,
        })

        await newUser.save();
        res.json({ message: 'User Created Successfully', user: newUser });

    } catch (error) {
        res.json({ error: error.message });
    }

}

const userLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        console.log(user);

        if (!user) {
            return res.status(400).json({ message: 'NO USER FOUND' });
        }

        // Compare passwords using async/await
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Password Doesn't Match" });
        }

        // Generate JWT token
        const token = jwt.sign({ name: user.name }, 'AzQ,PI)0(', { expiresIn: '1h' });

        return res.json({
            message: 'Login Successful',
            token,
            user
        });

    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = {
    registerNewUser,
    userLogin,
}