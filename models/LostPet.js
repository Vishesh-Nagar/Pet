const mongoose = require("mongoose");

const LostPetSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: "lost",
    },
    lastseen: {
        type: String,
        required: false,
    },
    files: {
        type: Array,
        required: false,
    },
    location: {
        type: Object,
        required: true,
    },
    time: {
        type: String,
        required: false,
    },
    user_type: {
        type: String,
        required: true,
    },
});

const LostPet = (module.exports = mongoose.model("LostPet", LostPetSchema));
