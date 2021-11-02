const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
}

const updatePost = async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (post.userId === userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json("Publicación actualizada");
        } else {
            res.status(403).json("Solo puedes actualizar tus publicaciones");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deletePost = async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Publicación eliminada");
        } else {
            res.status(403).json("Solo puedes eliminar tus publicaciones");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const likePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const post = await Post.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId} });
            res.status(200).json("Me gusta");
        } else {
            await post.updateOne({ $pull: { likes: userId} });
            res.status(200).json("No me gusta");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id)
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getTimelinePost = async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPost = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followins.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPost.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    getTimelinePost
}