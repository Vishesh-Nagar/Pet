const express = require("express");
const router = express.Router();
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");
const Post = require("../../models/Post");
const Adopter = require("../../models/Adopter");
const config = require("config");
const crypto = require("crypto");
const auth = require("../../middleware/auth");
var ipapi = require("ipapi.co");
var multer = require("multer");
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
    Post.find({}, (err, items) => {
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

router.get("/available/:tag", (req, res) => {
    function custom_sort(a, b) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    Post.find({ available: "Yes", tag: req.params.tag }, (err, items) => {
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
router.get("/available", (req, res) => {
    function custom_sort(a, b) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    Post.find({ available: "Yes" }, (err, items) => {
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
    function custom_sort(a, b) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    Post.find({ user_id: req.params.id }, (err, items) => {
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

router.put("/:id", (req, res) => {
    if (req.body.formData.status == "No") {
        Post.findByIdAndUpdate(
            req.params.id,
            { available: "No" },
            (err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(
                        "Post stopped accepting applicants successfully"
                    );
                }
            }
        );
    } else if (req.body.formData.status == "Yes") {
        Post.findByIdAndUpdate(
            req.params.id,
            { available: "Yes" },
            (err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(
                        "Post started accepting applicants successfully"
                    );
                }
            }
        );
    }
});
router.delete("/:id", function (req, res) {
    Post.findByIdAndRemove(req.params.id, function (err, out) {
        if (err) console.log(err);
        else res.json(out);
    });
});

router.post("/", upload.array("files[]", 10), (req, res, next) => {
    const time = Date.now();
    const today = new Date(time);
    var post = new Post({
        user_name: JSON.parse(req.body.user).name,
        user_id: JSON.parse(req.body.user).id,
        caption: req.body.caption,
        likes: 0,
        time: today,
        user_type: req.body.user_type,
        available: req.body.status,
        tag: req.body.tag,
    });

    req.files.forEach(function (fileobj) {
        post.files.push(fileobj.id);
    });
    post.save().then(res.json(post));
});

router.get("/image/:filename", function (req, res) {
    global.gfs.files.findOne(
        { filename: req.params.filename },
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

router.get("/video/:filename", function (req, res) {
    global.gfs.files.findOne(
        { filename: req.params.filename },
        function (err, file) {
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: "No file exists",
                });
            }
            if (
                file.contentType === "video/mp4" ||
                file.contentType === "video/ogg" ||
                file.contentType === "video/webm"
            ) {
                const readStream = gfs.createReadStream(file.filename);
                readStream.pipe(res);
            } else {
                return res.status(404).json({
                    err: "Not a video",
                });
            }
        }
    );
});

router.get("/document/:filename", function (req, res) {
    global.gfs.files.findOne(
        { filename: req.params.filename },
        function (err, file) {
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: "No file exists",
                });
            }
            if (
                file.contentType === "application/pdf" ||
                file.contentType === "application/octet-stream" ||
                file.contentType === "text/plain" ||
                file.contentType === "application/x-zip-compressed"
            ) {
                const readStream = gfs.createReadStream(file.filename);
                readStream.pipe(res);
            } else {
                return res.status(404).json({
                    err: "Not a document",
                });
            }
        }
    );
});

router.post("/like/:user/:id", (req, res) => {
    User.findById(req.params.user, (err, user) => {
        user.liked_posts.push(req.params.id);
        user.save().then(
            Post.findById(req.params.id, (err, item) => {
                if (err) {
                    console.log(err);
                    res.status(500).json("An error occured.");
                } else {
                    item.likes++;
                    item.save();
                }
            })
        );
    });
});

router.post("/apply/:user/:id", (req, res) => {
    var callback = function (resp) {
        newAdopter.location = resp;
        newAdopter.save().then((adopter) => res.json(adopter));
        updateApplicants(req, res);
    };

    const newAdopter = new Adopter({
        userID: req.params.user,
        postID: req.params.id,
        description: req.body.formData.description,
        name: req.body.formData.name,
        marital_status: req.body.formData.marital_status,
        age: req.body.formData.age,
        sex: req.body.formData.sex,
        annualIncome: req.body.formData.annualIncome,
        address: req.body.formData.address,
        owner: req.body.formData.owner,
        ownerID: req.body.formData.ownerID,
    });
    ipapi.location(callback);
    const time = Date.now();
    const today = new Date(time);
});
function updateApplicants(req, res) {
    User.findById(req.params.user, (err, user) => {
        user.applied_posts.push(req.params.id);
        user.save().then(
            Post.findById(req.params.id, (err, item) => {
                if (err) {
                    console.log(err);
                    res.status(500).json("An error occured.");
                } else {
                    item.applicants++;
                    item.save();
                }
            })
        );
    });
}

router.post("/dislike/:user/:id", (req, res) => {
    User.findById(req.params.user, (err, user) => {
        user.liked_posts = user.liked_posts.filter(function (item) {
            return item !== req.params.id;
        });
        user.save().then(
            Post.findById(req.params.id, (err, item) => {
                if (err) {
                    console.log(err);
                    res.status(500).json("An error occured.");
                } else {
                    item.likes--;
                    item.save();
                }
            })
        );
    });
});

router.get("/like/:user/:id", (req, res) => {
    User.findById(req.params.user, (err, user) => {
        if (user.liked_posts.includes(req.params.id)) res.json({ flag: true });
        else res.json({ flag: false });
    });
});
router.get("/apply/:user/:id", (req, res) => {
    User.findById(req.params.user, (err, user) => {
        if (user.applied_posts.includes(req.params.id))
            res.json({ flag: true });
        else res.json({ flag: false });
    });
});
router.get("/ngo/apply/:user/:id", (req, res) => {
    Ngo.findById(req.params.user, (err, user) => {
        if (user.applied_posts.includes(req.params.id))
            res.json({ flag: true });
        else res.json({ flag: false });
    });
});
router.post("/ngo/like/:user/:id", (req, res) => {
    Ngo.findById(req.params.user, (err, user) => {
        user.liked_posts.push(req.params.id);
        user.save().then(
            Post.findById(req.params.id, (err, item) => {
                if (err) {
                    console.log(err);
                    res.status(500).json("An error occured.");
                } else {
                    item.likes++;
                    item.save();
                }
            })
        );
    });
});
router.post("/ngo/dislike/:user/:id", (req, res) => {
    Ngo.findById(req.params.user, (err, user) => {
        user.liked_posts = user.liked_posts.filter(function (item) {
            return item !== req.params.id;
        });
        user.save().then(
            Post.findById(req.params.id, (err, item) => {
                if (err) {
                    console.log(err);
                    res.status(500).json("An error occured.");
                } else {
                    item.likes--;
                    item.save();
                }
            })
        );
    });
});

router.get("/ngo/like/:user/:id", (req, res) => {
    Ngo.findById(req.params.user, (err, user) => {
        if (user.liked_posts.includes(req.params.id)) res.json({ flag: true });
        else res.json({ flag: false });
    });
});

router.post("/notify/:id", function (req, res) {
    const notif = new Notif({
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        user_type: req.body.user_type,
        type: "apply",
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
        type: "apply",
    });
    notif.save();
    Ngo.findById(req.params.id, (err, user) => {
        user.notifs.push(notif);
        user.save();
    });
});

module.exports = router;
