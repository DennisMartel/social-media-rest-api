const User = require("../models/User");
const bcrypt = require('bcryptjs');

const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // generating password encryption
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating user
        const newUser = await new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        // saving the user
        const user = await newUser.save();
        res.status(200).json(user); // return response
    } catch (err) {
        res.status(500).json(err); // error
    }
}

const signinUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // find and validating user email
        const user = await User.findOne({ email: email });
        !user && res.status(404).json('usuario no encontrado');
    
        // validating user password hashed
        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(404).json('Contraseña incorrecta');
    
        res.status(200).json(user); // return reponse
    } catch (err) {
        res.status(500).json(err); // error
    }
}

module.exports = {
    signupUser,
    signinUser
}