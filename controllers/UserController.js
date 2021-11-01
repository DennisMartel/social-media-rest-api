const User = require("../models/User");
const bcrypt = require('bcryptjs');

const updateUser  = async (req, res) => {
    const { userId, password, isAdmin } = req.body;

    // verify user id with params id or user is admin
    if (userId === req.params.id || isAdmin) {
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

const followUser = async (req, res) => {
    const { userId } = req.body;
    const { paramId } = req.params;

    if (userId !== paramId) {
        try {
            const user = await User.findById(paramId);
            const currentUser = await User.findById(userId);

            if (!user.followers.includes(userId)) {
                res.status(200).json("Puedes seguir a está persona");
            } else {
                res.status(403).json("Ya estas sigiendo a esta persona");
            }

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("No puedes seguirte a ti mismo");
    }
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