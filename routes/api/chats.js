const express = require("express");
const router = express.Router();
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");
const config = require("config");
const crypto = require("crypto");
const auth = require("../../middleware/auth");
var multer = require("multer");

const { Message } = require("../../models/Message");
const User = require("../../models/User");
const Ngo = require("../../models/Ngo");

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

router.get("/unread/:id", (req, res) => {
    User.findById(req.params.id).then((user) => {
        if (!user) {
            Ngo.findById(req.params.id).then((ngo) => {
                return res.json(ngo.num_unread_messages);
            });
        }
        return res.json(user.num_unread_messages);
    });
});

router.get("/:id/:id2", (req, res) => {
    User.findById(req.params.id).then((user) => {
        if (!user) {
            Ngo.findById(req.params.id).then((ngo) => {
                var msgs = [];
                if (ngo.messages.has(req.params.id2)) {
                    msgs = ngo.messages.get(req.params.id2);
                }

                if (ngo.unread_messages.has(req.params.id2)) {
                    if (ngo.unread_messages.get(req.params.id2) > 0) {
                        ngo.num_unread_messages = ngo.num_unread_messages - 1;
                        ngo.unread_messages.set(req.params.id2, 0);
                        ngo.save();
                    }
                }
                return res.json(msgs);
            });
        }
        var msgs = [];
        if (user.messages.has(req.params.id2)) {
            msgs = user.messages.get(req.params.id2);
        }
        if (user.unread_messages.has(req.params.id2)) {
            if (user.unread_messages.get(req.params.id2) > 0) {
                user.num_unread_messages = user.num_unread_messages - 1;
                user.unread_messages.set(req.params.id2, 0);
                user.save();
            }
        }

        res.json(msgs);
    });
});

router.get("/:id", (req, res) => {
    User.findById(req.params.id).then((user) => {
        if (!user) {
            Ngo.findById(req.params.id).then((ngo) => {
                var msgs = ngo.messages;
                var unread_messages = ngo.unread_messages;
                return res.json({
                    msgs: msgs,
                    unread_messages: unread_messages,
                });
            });
        }
        var msgs = user.messages;
        var unread_messages = user.unread_messages;
        res.json({ msgs: msgs, unread_messages: unread_messages });
    });
});

router.post("/:id/:id2", upload.array("files[]", 10), (req, res) => {
    const t = req.body.text;
    const s = t.substring(0, Math.min(t.length, 30)) + " ...";

    User.findById(req.params.id).then((user) => {
        var uservar = user;
        if (user) {
            User.findById(req.params.id2).then((user2) => {
                var uservar2 = user2;
                if (user2) {
                    const { text, position, type, uri } = req.body;
                    var urivar = null;
                    var typevar = type;
                    if (type == "photo") {
                        urivar =
                            "http://localhost:5000/api/messages/image/" +
                            req.files[0].filename;
                    } else if (type == "video") {
                        try {
                            urivar =
                                "http://localhost:5000/api/messages/video/" +
                                req.files[0].filename;
                        } catch (err) {
                            console.log(err);
                        }
                        typevar = "file";
                    } else if (type != "text") {
                        urivar =
                            "http://localhost:5000/api/messages/document/" +
                            req.files[0].filename;
                    }
                    const newMessage1 = new Message({
                        sender: uservar.name,
                        receiver: uservar2.name,
                        text: text,
                        position: "right",
                        subtitle: s,
                        type: typevar,
                        data: { uri: urivar },
                    });
                    req.files.forEach(function (fileobj) {
                        newMessage1.files.push(fileobj.id);
                    });
                    newMessage1.save();
                    temp = [];

                    if (uservar.messages.has(req.params.id2)) {
                        temp = uservar.messages.get(req.params.id2);
                    }
                    temp.push(newMessage1);
                    uservar.messages.set(req.params.id2, temp);
                    uservar.markModified("messages");
                    uservar.save().then(() => {
                        const newMessage2 = new Message({
                            sender: uservar.name,
                            receiver: uservar2.name,
                            text: text,
                            position: "left",
                            subtitle: s,
                            type: typevar,
                            data: { uri: urivar },
                        });
                        req.files.forEach(function (fileobj) {
                            newMessage2.files.push(fileobj.id);
                        });
                        newMessage2.save();
                        temp = [];

                        if (uservar2.messages.has(req.params.id)) {
                            temp = uservar2.messages.get(req.params.id);
                        }
                        if (uservar2.unread_messages.has(req.params.id)) {
                            if (
                                uservar2.unread_messages.get(req.params.id) == 0
                            ) {
                                uservar2.num_unread_messages =
                                    uservar2.num_unread_messages + 1;
                            }
                            uservar2.unread_messages.set(
                                req.params.id,
                                uservar2.unread_messages.get(req.params.id) + 1
                            );
                        } else {
                            uservar2.unread_messages.set(req.params.id, 1);
                            uservar2.num_unread_messages =
                                uservar2.num_unread_messages + 1;
                        }
                        temp.push(newMessage2);
                        uservar2.messages.set(req.params.id, temp);
                        uservar2.markModified("messages");
                        uservar2
                            .save()
                            .then()
                            .catch((err) => console.log(err));
                    });
                } else {
                    Ngo.findById(req.params.id2).then((ngo2) => {
                        uservar2 = ngo2;
                        const { text, position, type, uri } = req.body;
                        var urivar = null;
                        var typevar = type;
                        if (type == "photo") {
                            urivar =
                                "http://localhost:5000/api/messages/image/" +
                                req.files[0].filename;
                        } else if (type == "video") {
                            try {
                                urivar =
                                    "http://localhost:5000/api/messages/video/" +
                                    req.files[0].filename;
                            } catch (err) {
                                console.log(err);
                            }
                            typevar = "file";
                        } else if (type != "text") {
                            urivar =
                                "http://localhost:5000/api/messages/document/" +
                                req.files[0].filename;
                        }
                        const newMessage1 = new Message({
                            sender: uservar.name,
                            receiver: uservar2.name,
                            text: text,
                            position: "right",
                            subtitle: s,
                            type: typevar,
                            data: { uri: urivar },
                        });
                        req.files.forEach(function (fileobj) {
                            newMessage1.files.push(fileobj.id);
                        });
                        newMessage1.save();
                        temp = [];

                        if (uservar.messages.has(req.params.id2)) {
                            temp = uservar.messages.get(req.params.id2);
                        }
                        temp.push(newMessage1);
                        uservar.messages.set(req.params.id2, temp);
                        uservar.markModified("messages");
                        uservar.save().then(() => {
                            const newMessage2 = new Message({
                                sender: uservar.name,
                                receiver: uservar2.name,
                                text: text,
                                position: "left",
                                subtitle: s,
                                type: typevar,
                                data: { uri: urivar },
                            });
                            req.files.forEach(function (fileobj) {
                                newMessage2.files.push(fileobj.id);
                            });
                            newMessage2.save();
                            temp = [];

                            if (uservar2.messages.has(req.params.id)) {
                                temp = uservar2.messages.get(req.params.id);
                            }
                            if (uservar2.unread_messages.has(req.params.id)) {
                                if (
                                    uservar2.unread_messages.get(
                                        req.params.id
                                    ) == 0
                                ) {
                                    uservar2.num_unread_messages =
                                        uservar2.num_unread_messages + 1;
                                }
                                uservar2.unread_messages.set(
                                    req.params.id,
                                    uservar2.unread_messages.get(
                                        req.params.id
                                    ) + 1
                                );
                            } else {
                                uservar2.unread_messages.set(req.params.id, 1);
                                uservar2.num_unread_messages =
                                    uservar2.num_unread_messages + 1;
                            }
                            temp.push(newMessage2);
                            uservar2.messages.set(req.params.id, temp);
                            uservar2.markModified("messages");
                            uservar2
                                .save()
                                .then()
                                .catch((err) => console.log(err));
                        });
                    });
                }
            });
        } else {
            Ngo.findById(req.params.id).then((ngo) => {
                var uservar = ngo;
                User.findById(req.params.id2).then((user2) => {
                    var uservar2 = user2;
                    if (user2) {
                        const { text, position, type, uri } = req.body;
                        var urivar = null;
                        var typevar = type;
                        if (type == "photo") {
                            urivar =
                                "http://localhost:5000/api/messages/image/" +
                                req.files[0].filename;
                        } else if (type == "video") {
                            try {
                                urivar =
                                    "http://localhost:5000/api/messages/video/" +
                                    req.files[0].filename;
                            } catch (err) {
                                console.log(err);
                            }
                            typevar = "file";
                        } else if (type != "text") {
                            urivar =
                                "http://localhost:5000/api/messages/document/" +
                                req.files[0].filename;
                        }
                        const newMessage1 = new Message({
                            sender: uservar.name,
                            receiver: uservar2.name,
                            text: text,
                            position: "right",
                            subtitle: s,
                            type: typevar,
                            data: { uri: urivar },
                        });
                        req.files.forEach(function (fileobj) {
                            newMessage1.files.push(fileobj.id);
                        });
                        newMessage1.save();
                        temp = [];

                        if (uservar.messages.has(req.params.id2)) {
                            temp = uservar.messages.get(req.params.id2);
                        }
                        temp.push(newMessage1);
                        uservar.messages.set(req.params.id2, temp);
                        uservar.markModified("messages");
                        uservar.save().then(() => {
                            const newMessage2 = new Message({
                                sender: uservar.name,
                                receiver: uservar2.name,
                                text: text,
                                position: "left",
                                subtitle: s,
                                type: typevar,
                                data: { uri: urivar },
                            });
                            req.files.forEach(function (fileobj) {
                                newMessage2.files.push(fileobj.id);
                            });
                            newMessage2.save();
                            temp = [];

                            if (uservar2.messages.has(req.params.id)) {
                                temp = uservar2.messages.get(req.params.id);
                            }
                            if (uservar2.unread_messages.has(req.params.id)) {
                                if (
                                    uservar2.unread_messages.get(
                                        req.params.id
                                    ) == 0
                                ) {
                                    uservar2.num_unread_messages =
                                        uservar2.num_unread_messages + 1;
                                }
                                uservar2.unread_messages.set(
                                    req.params.id,
                                    uservar2.unread_messages.get(
                                        req.params.id
                                    ) + 1
                                );
                            } else {
                                uservar2.unread_messages.set(req.params.id, 1);
                                uservar2.num_unread_messages =
                                    uservar2.num_unread_messages + 1;
                            }
                            temp.push(newMessage2);
                            uservar2.messages.set(req.params.id, temp);
                            uservar2.markModified("messages");
                            uservar2
                                .save()
                                .then()
                                .catch((err) => console.log(err));
                        });
                    } else {
                        Ngo.findById(req.params.id2).then((ngo2) => {
                            uservar2 = ngo2;
                            const { text, position, type, uri } = req.body;
                            var urivar = null;
                            var typevar = type;
                            if (type == "photo") {
                                urivar =
                                    "http://localhost:5000/api/messages/image/" +
                                    req.files[0].filename;
                            } else if (type == "video") {
                                try {
                                    urivar =
                                        "http://localhost:5000/api/messages/video/" +
                                        req.files[0].filename;
                                } catch (err) {
                                    console.log(err);
                                }
                                typevar = "file";
                            } else if (type != "text") {
                                urivar =
                                    "http://localhost:5000/api/messages/document/" +
                                    req.files[0].filename;
                            }
                            const newMessage1 = new Message({
                                sender: uservar.name,
                                receiver: uservar2.name,
                                text: text,
                                position: "right",
                                subtitle: s,
                                type: typevar,
                                data: { uri: urivar },
                            });
                            req.files.forEach(function (fileobj) {
                                newMessage1.files.push(fileobj.id);
                            });
                            newMessage1.save();
                            temp = [];

                            if (uservar.messages.has(req.params.id2)) {
                                temp = uservar.messages.get(req.params.id2);
                            }
                            temp.push(newMessage1);
                            uservar.messages.set(req.params.id2, temp);
                            uservar.markModified("messages");
                            uservar.save().then(() => {
                                const newMessage2 = new Message({
                                    sender: uservar.name,
                                    receiver: uservar2.name,
                                    text: text,
                                    position: "left",
                                    subtitle: s,
                                    type: typevar,
                                    data: { uri: urivar },
                                });
                                req.files.forEach(function (fileobj) {
                                    newMessage2.files.push(fileobj.id);
                                });
                                newMessage2.save();
                                temp = [];

                                if (uservar2.messages.has(req.params.id)) {
                                    temp = uservar2.messages.get(req.params.id);
                                }
                                if (
                                    uservar2.unread_messages.has(req.params.id)
                                ) {
                                    if (
                                        uservar2.unread_messages.get(
                                            req.params.id
                                        ) == 0
                                    ) {
                                        uservar2.num_unread_messages =
                                            uservar2.num_unread_messages + 1;
                                    }
                                    uservar2.unread_messages.set(
                                        req.params.id,
                                        uservar2.unread_messages.get(
                                            req.params.id
                                        ) + 1
                                    );
                                } else {
                                    uservar2.unread_messages.set(
                                        req.params.id,
                                        1
                                    );
                                    uservar2.num_unread_messages =
                                        uservar2.num_unread_messages + 1;
                                }
                                temp.push(newMessage2);
                                uservar2.messages.set(req.params.id, temp);
                                uservar2.markModified("messages");
                                uservar2
                                    .save()
                                    .then()
                                    .catch((err) => console.log(err));
                            });
                        });
                    }
                });
            });
        }
    });
});

module.exports = router;
