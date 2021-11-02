const Post = require("../models/Post");

const createPost = async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
}

const updatePost = () => {

}

const deletePost = () => {

}

const likePost = () => {

}

const getPost = () => {

}

const getTimelinePost = () => {

}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    getTimelinePost
}