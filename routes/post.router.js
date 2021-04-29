const router = require("express").Router();
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const { populateComment } = require("../helper/index");
const verifyToken = require("../middleware/auth");
// var Image = require("../models/image");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./data/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    console.log(req.isAuth);
    if (
        req.isAuth &&
        (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    ) {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

router.get("/", async (req, res) => {
    try {
        let posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "comments",
                populate: {
                    path: "id",
                    model: "Comment",
                },
            })
            .lean();
        res.json({
            feed: posts.map((post) => {
                return {
                    ...post,
                    comments: post.comments.map((comment) => {
                        const id = comment.id;
                        return {
                            ...comment,
                            id: id.id,
                            author: id.author,
                            createdAt: id.createdAt,
                        };
                    }),
                };
            }),
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//Route for sending the posts of only following accounts
router.get("/:id", verifyToken, async (req, res) => {
    try {
        let user = await User.findById(req.user.id).lean();
        const foll = user.following.map((x) => x.id);
        let posts = await Post.find({ "author.id": { $in: foll } })
            .sort({ createdAt: -1 })
            .populate({
                path: "comments",
                populate: {
                    path: "id",
                    model: "Comment",
                },
            })
            .lean();
        res.json({
            feed: posts.map((post) => {
                return {
                    ...post,
                    comments: post.comments.map((comment) => {
                        const id = comment.id;
                        return {
                            ...comment,
                            id: id.id,
                            author: id.author,
                            createdAt: id.createdAt,
                        };
                    }),
                };
            }),
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "NOT_AUTHORIZED" });
    }
});

router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    try {
        if (!req.isAuth) throw new Error("NOT_AUTHORIZED");
        console.log(req.file.path);
        const post = new Post({
            text: req.body.text,
            image: req.file.path,
            likes: [],
            comments: [],
            author: {
                id: req.user.id,
                username: req.user.username,
            },
        });
        console.log(post);
        await post.save();
        res.json({ status: "posted", post: post, image: req.file.path });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
router.post("/comment", verifyToken, async (req, res) => {
    try {
        if (!req.isAuth) throw new Error("NOT_AUTHORIZED");
        post = await Post.findById(req.body.id);
        const comment = new Comment({
            text: req.body.comment,
            author: {
                id: req.user.id,
                username: req.user.username,
            },
        });
        post.comments = [
            ...post.comments,
            { id: comment._id, text: comment.text },
        ];
        await comment.save();
        await post.save();

        return res.json({ status: "added", post: post, comment: comment });
    } catch (err) {
        res.status(500).json({ error: e.message });
    }
});
router.post("/like", verifyToken, async (req, res) => {
    try {
        if (!req.isAuth) throw new Error("NOT_AUTHORIZED");
        post = await Post.findById(req.body.id);
        const x = post.likes.filter((like) => {
            console.log(like.id, req.user.id);
            return like.id == req.user.id;
        });
        console.log(x);
        if (x.length) return res.status(500).json({ error: "ALREADY_LIKED" });
        post.likes = [
            ...post.likes,
            { id: req.user.id, username: req.user.username },
        ];
        console.log(post);
        await post.save();
        res.json({ status: "liked", post: post });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
module.exports = router;
