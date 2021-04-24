const router = require("express").Router();
const Post = require("../models/post.model");
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
    const posts = await Post.find().lean();
    res.json({ feed: posts });
});

router.post("/", upload.single("image"), async (req, res) => {
    console.log(req.file.path);
    const post = new Post({
        text: req.body.text,
        image: req.file.path,
        // body: req.body.body,
        // date: new Date(),
        likes: [],
        comments: [],
        author: {
            id: "60847b1b2b880028309ac280",
            username: "Raghav Agarwal",
        },
    });
    console.log(post);
    // await post.save();
    res.json({ status: "posted", post: post, image: req.file.path });
});
module.exports = router;
