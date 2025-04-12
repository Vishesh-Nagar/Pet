const express = require("express");
const router = express.Router();

const Donation = require("../../models/Donation");
const Contribute = require("../../models/Contribute");

router.get("/:id", (req, res) => {
    Contribute.find({ donationID: req.params.id }, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured.");
        } else {
            global.gfs.files.find().toArray(function (err, files) {
                if (err) console.log(err);
                else {
                    res.json({ items: items });
                }
            });
        }
    });
});

module.exports = router;
