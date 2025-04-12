const express = require("express");
const router = express.Router();
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");
const AdoptPet = require("../../models/Adopt");
const Adopter = require("../../models/Adopter");
const config = require("config");
const crypto = require("crypto");

var multer = require("multer");
var ipapi = require("ipapi.co");

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

router.get("/:id", (req, res) => {
    Adopter.find({ userID: req.params.id }, (err, items) => {
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

router.get("/request/:id", (req, res) => {
    Adopter.find({ ownerID: req.params.id }, (err, items) => {
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

router.post("/", upload.array("files[]", 10), (req, res, next) => {
    var callback = function (resp) {
        post.location = resp;
        post.save().then((p) => res.json(p));
    };
    const time = Date.now();
    const today = new Date(time);
    var post = new AdoptPet({
        description: req.body.description,
        name: req.body.name,
        category: req.body.category,
        age: req.body.age,
    });

    ipapi.location(callback);
});

module.exports = router;
