const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { MessageSchema } = require("./Message");
const { NotifSchema } = require("./Notif");

const NgoSchema = new Schema({
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
    contact: {
        type: String,
        required: true,
    },

    hno: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },

    register_date: {
        type: Date,
        default: Date.now,
    },
    license: {
        type: String,
        required: true,
    },
    profile_pic: {
        type: String,
        required: false,
    },
    liked_posts: {
        type: Array,
        required: false,
    },
    notifs: {
        type: Array,
        of: NotifSchema,
        default: [],
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
    num_unread_messages: {
        type: Number,
        default: 0,
    },
    applied_posts: {
        type: Array,
        required: false,
        default: [],
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = Ngo = mongoose.model("ngo", NgoSchema);
