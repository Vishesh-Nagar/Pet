const express = require("express");
const router = express.Router();
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

var multer = require("multer");
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

const User = require("../../models/User");
const Ngo = require("../../models/Ngo");
router.post("/", upload.array("files[]", 10), (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    User.findOne({ email }).then((user) => {
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const newUser = new User({
            name,
            email,
            password,
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.profile_pic = req.files[0].filename;
                newUser.save().then((user) => {
                    jwt.sign(
                        { id: user.id },
                        config.get("jwtSecret"),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                },
                            });
                        }
                    );
                });
            });
        });
    });
});

router.get("/image/:user/", function (req, res) {
    User.findById(req.params.user, (err, user) => {
        if (user) {
            global.gfs.files.findOne(
                { filename: user.profile_pic },
                function (err, file) {
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
                }
            );
        } else {
            Ngo.findById(req.params.user).then((ngo) => {
                global.gfs.files.findOne(
                    { filename: ngo.profile_pic },
                    function (err, file) {
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
                            const readStream = gfs.createReadStream(
                                file.filename
                            );
                            readStream.pipe(res);
                        } else {
                            return res.status(404).json({
                                err: "Not an image",
                            });
                        }
                    }
                );
            });
        }
    });
});

router.get("/image/ngo/:user/", function (req, res) {
    Ngo.findById(req.params.user, (err, user) => {
        if (user == null) return;
        global.gfs.files.findOne(
            { filename: user.profile_pic },
            function (err, file) {
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
            }
        );
    });
});

router.get("/isuser/:id", function (req, res) {
    User.findById(req.params.id, (err, user) => {
        if (user != null) res.json({ flag: true });
        else res.json({ flag: false });
    });
});

router.get("/notifications/:id", function (req, res) {
    function custom_sort(a, b) {
        return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
    User.findById(req.params.id, (err, user) => {
        user.notifs.sort(custom_sort);
        res.json(user.notifs);
    });
});

router.delete("/notifications/:user_id/:id", function (req, res) {
    Notif.findByIdAndRemove(req.params.id, (err, notifs) => {
        User.findById(req.params.user_id, (err, user) => {
            const temp = user.notifs.filter((n) => n._id != req.params.id);
            user.notifs = temp;
            user.save();
        });
        res.json(notifs);
    });
});

module.exports = router;
