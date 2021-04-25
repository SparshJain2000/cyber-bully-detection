const router = require("express").Router();
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
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
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
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
        console.log(e);
    }
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        console.log(req.file.path);
        const post = new Post({
            text: req.body.text,
            image: req.file.path,
            // body: req.body.body,
            // date: new Date(),
            likes: [],
            comments: [],
            author: {
                id: "60847d8640310c1cb0e7b5ea",
                username: "Jayant Malik",
            },
        });
        console.log(post);
        // await post.save();
        res.json({ status: "posted", post: post, image: req.file.path });
    } catch (err) {
        res.json({ status: "Error" });
    }
});
router.post("/comment", verifyToken, async (req, res) => {
    if (req.isAuth) {
        try {
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
            // console.log(req.user);
            await comment.save();
            await post.save();

            res.json({ status: "added", post: post });
        } catch (err) {
            res.json({ status: "Error" });
            console.log(err);
        }
    } else res.json({ err: "NOT_AUTH" });
});
router.post("/like", verifyToken, async (req, res) => {
    try {
        post = await Post.findById(req.body.id);
        const x = post.likes.filter((like) => {
            console.log(like.id, req.user.id);
            return like.id == req.user.id;
        });
        console.log(x);
        if (x.length) return res.json({ err: "Already Liked" });
        post.likes = [
            ...post.likes,
            { id: req.user.id, username: req.user.username },
        ];
        // console.log(post);
        // await post.save();
        res.json({ status: "liked", post: post });
    } catch (err) {
        res.json({ status: "Error" });
        console.log(err);
    }
});
module.exports = router;
