const express = require("express");
const router = express.Router();
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");
const LostPet = require("../../models/LostPet");
const config = require("config");
const crypto = require("crypto");
var multer = require("multer");
var ipapi = require("ipapi.co");

const User = require("../../models/User");
const Ngo = require("../../models/Ngo");
const { Notif } = require("../../models/Notif");

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

router.get("/", (req, res) => {
    function custom_sort(a, b) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    LostPet.find({ status: "lost" }, (err, items) => {
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

router.post("/", upload.array("files[]", 10), (req, res, next) => {
    const time = Date.now();
    const today = new Date(time);
    var post = new LostPet({
        description: req.body.description,
        lastseen: req.body.lastseen,
        time: today,
        user_id: JSON.parse(req.body.user).id,
        user_name: JSON.parse(req.body.user).name,
        user_type: req.body.user_type,
        breed: req.body.breed,
        location: JSON.parse(req.body.location),
    });

    req.files.forEach(function (fileobj) {
        post.files.push(fileobj.id);
    });
    post.save().then((p) => res.json(p));
});

router.get("/my/:id", (req, res) => {
    function custom_sort(a, b) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    LostPet.find({ status: "lost", user_id: req.params.id }, (err, items) => {
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

router.delete("/:id", function (req, res) {
    LostPet.findByIdAndRemove(req.params.id, function (err, out) {
        if (err) console.log(err);
        else res.json(out);
    });
});

router.get("/found", (req, res) => {
    function custom_sort(a, b) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    LostPet.find({ status: "found" }, (err, items) => {
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

router.get("/found/:id", (req, res) => {
    function custom_sort(a, b) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    LostPet.find({ status: "found", user_id: req.params.id }, (err, items) => {
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

router.post("/found", upload.array("files[]", 10), (req, res, next) => {
    var callback = function (resp) {
        post.location = resp;
        post.save().then((p) => res.json(p));
    };
    const time = Date.now();
    const today = new Date(time);
    try {
        var post = new LostPet({
            description: req.body.description,
            lastseen: req.body.lastseen,
            time: today,
            status: "found",
            user_id: JSON.parse(req.body.user).id,
            user_name: JSON.parse(req.body.user).name,
            user_type: req.body.user_type,
            breed: req.body.breed,
            location: JSON.parse(req.body.location),
        });
    } catch (err) {
        console.log(err);
    }
    req.files.forEach(function (fileobj) {
        post.files.push(fileobj.id);
    });
    post.save().then((p) => res.json(p));
});

router.get("/image/:filename", function (req, res) {
    gfs.files.findOne({ filename: req.params.filename }, function (err, file) {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: "No file exists",
            });
        }
        if (
            file.contentType === "image/jpeg" ||
            file.contentType === "image/jpg" ||
            file.contentType === "image/png"
        ) {
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else {
            return res.status(404).json({
                err: "Not an image",
            });
        }
    });
});

router.post("/notify/:id", function (req, res) {
    const notif = new Notif({
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        user_type: req.body.user_type,
        type: "foundpet",
    });
    notif.save();
    User.findById(req.params.id, (err, user) => {
        user.notifs.push(notif);
        user.save();
    });
});

router.post("/ngo/notify/:id", function (req, res) {
    const notif = new Notif({
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        user_type: req.body.user_type,
        type: "foundpet",
    });
    notif.save();
    Ngo.findById(req.params.id, (err, user) => {
        user.notifs.push(notif);
        user.save();
    });
});

module.exports = router;
