const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContributeSchema = new Schema({
    donor: {
        type: String,
        required: true,
    },
    cause: {
        type: String,
    },
    amount: {
        type: Number,
        default: 0,
    },
    date_of_transaction: {
        type: String,
    },
    donationDrive: {
        type: String,
    },
    donationID: {
        type: String,
    },

    emailID: {
        type: String,
    },
    contactNo: {
        type: Number,
    },
    orderID: {
        type: String,
    },
    status: {
        type: String,
    },
});

module.exports = Contribute = mongoose.model("contribute", ContributeSchema);
