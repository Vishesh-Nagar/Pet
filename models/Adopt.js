const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdoptPetSchema = new Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    age: {
        type: Number,
    },
    files: {
        type: Array,
        required: false,
    },
    location: {
        type: Object,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "available",
    },
});

const AdoptPet = (module.exports = mongoose.model("AdoptPet", AdoptPetSchema));
