const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    files: {
        type: Array,
        required: false,
    },
    currentAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    targetAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: String,
        required: false,
    },
    location: {
        type: Object,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: "",
    },
});

module.exports = Donation = mongoose.model("donation", DonationSchema);
