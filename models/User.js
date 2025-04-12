const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { MessageSchema } = require("./Message");
const { NotifSchema } = require("./Notif");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    register_date: {
        type: Date,
        default: Date.now,
    },
    messages: {
        type: Map,
        of: [MessageSchema],
        default: {},
    },
    unread_messages: {
        type: Map,
        of: Number,
        default: {},
    },
    notifs: {
        type: Array,
        of: NotifSchema,
        default: [],
    },
    liked_posts: {
        type: Array,
        required: false,
        default: [],
    },
    applied_posts: {
        type: Array,
        required: false,
        default: [],
    },
    profile_pic: {
        type: String,
        required: false,
    },
    num_unread_messages: {
        type: Number,
        default: 0,
    },
});

module.exports = User = mongoose.model("user", UserSchema);
