const User = require("../models/User");
const bcrypt = require('bcryptjs');

const updateUser  = async (req, res) => {
    const { userId, password } = req.body;

    // verify user id with params id or user is admin
    if (userId === req.params.id || req.user.isAdmin) {
        if(password) {
            try {
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json('Datos Actualizados Correctamente');
        } catch (err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("Acceso No Autorizado");
    }
}

const deleteUser = async (req, res) => {
    const { userId, isAdmin } = req.body;

    // verify user id with params id or user is admin
    if (userId === req.params.id || isAdmin) {
        try {
            // deleting user
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Datos eliminados Correctamente');
        } catch (err) {
            res.status(500).json(err); // return error
        }
    } else {
        res.status(403).json("Acceso No Autorizado");
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatesAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err); // return error
    }
}

const followUser = async () => {

}

const unfollowUser = async () => {

}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    followUser,
    unfollowUser
}