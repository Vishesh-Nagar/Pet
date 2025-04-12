const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");

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

const Ngo = require("../../models/Ngo");

router.post("/", upload.array("files[]", 10), (req, res) => {
    const {
        name,
        email,
        password,
        contact,
        hno,
        street,
        city,
        state,
        pincode,
        license,
    } = req.body;

    if (!name || !email || !password || !contact || !license) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    Ngo.findOne({ email }).then((ngo) => {
        if (ngo) {
            return res.status(400).json({ msg: "Ngo already exists" });
        }

        const newNgo = new Ngo({
            name,
            email,
            password,
            contact,
            license,
            hno,
            street,
            city,
            pincode,
            state,
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newNgo.password, salt, (err, hash) => {
                if (err) throw err;
                newNgo.password = hash;
                newNgo.profile_pic = req.files[0].filename;
                newNgo.save().then((ngo) => {
                    jwt.sign(
                        { id: ngo.id },
                        config.get("jwtSecret"),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: ngo.id,
                                    name: ngo.name,
                                    email: ngo.email,
                                },
                            });
                        }
                    );
                });
            });
        });
    });
});

module.exports = router;
