const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotifSchema = new Schema(
    {
        user_id: {
            type: String,
            required: false,
        },
        user_type: {
            type: String,
            required: false,
        },
        user_name: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            default: "unread",
        },
        type: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports.NotifSchema = NotifSchema;
module.exports.Notif = mongoose.model("Notif", NotifSchema);
