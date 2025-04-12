const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const path = require("path");

const GridFsStorage = require("multer-gridfs-storage");
const Donation = require("../../models/Donation");
const config = require("config");
const crypto = require("crypto");
var ipapi = require("ipapi.co");
const { Notif } = require("../../models/Notif");
const User = require("../../models/User");
const Ngo = require("../../models/Ngo");
const Contribute = require("../../models/Contribute");

var multer = require("multer");
const storage = new GridFsStorage({
    url: config.get("mongoURI"),
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname);
                const original = file.originalname;
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads",
                    metadata: original,
                };
                resolve(fileInfo);
            });
        });
    },
});
const upload = multer({ storage });

function custom_sort(a, b) {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
}
router.get("/", (req, res) => {
    Donation.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured.");
        } else {
            global.gfs.files.find().toArray(function (err, files) {
                if (err) console.log(err);
                else {
                    items.sort(custom_sort);
                    res.json({ items: items, files: files });
                }
            });
        }
    });
});

router.get("/my/:id", (req, res) => {
    Donation.find({ user_id: req.params.id }, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured.");
        } else {
            global.gfs.files.find().toArray(function (err, files) {
                if (err) console.log(err);
                else {
                    items.sort(custom_sort);
                    res.json({ items: items, files: files });
                }
            });
        }
    });
});

router.get("/:id", (req, res) => {
    Donation.findOne({ _id: req.params.id }).then((donation) =>
        res.json(donation)
    );
});

router.post("/", upload.array("files[]", 10), (req, res, next) => {
    var callback = function (resp) {
        newDonation.location = resp;
        newDonation.save().then((donation) => res.json(donation));
    };

    const newDonation = new Donation({
        user_name: req.body.user_name,
        user_id: req.body.user_id,
        name: req.body.name,
        targetAmount: req.body.targetAmount,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
    });

    req.files.forEach(function (fileobj) {
        newDonation.files.push(fileobj.id);
    });
    ipapi.location(callback);
});

router.delete("/:id", function (req, res) {
    Donation.findByIdAndRemove(req.params.id, function (err, out) {
        if (err) console.log(err);
        else res.json(out);
    });
});

router.post("/ngo/notify/:id", function (req, res) {
    const notif = new Notif({
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        user_type: req.body.user_type,
        type: "donation",
    });
    notif.save();
    Ngo.findById(req.params.id, (err, user) => {
        user.notifs.push(notif);
        user.save();
    });
});

module.exports = router;
