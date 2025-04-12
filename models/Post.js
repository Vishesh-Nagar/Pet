const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
        default: "other",
    },
    user_id: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: false,
    },
    files: {
        type: Array,
        required: false,
    },
    filetype: {
        type: String,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    applicants: {
        type: Number,
        required: true,
        default: 0,
    },
    time: {
        type: String,
        required: false,
    },
    user_type: {
        type: String,
        required: false,
    },
    available: {
        type: String,
        required: false,
    },
});

const Post = (module.exports = mongoose.model("Post", PostSchema));
