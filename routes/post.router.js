const router = require("express").Router();
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
router.get("/", (req, res) => {
    res.json({
        _id: 123,
        content: "lasfj",
    });
});

router.post("/", upload.single("image"), (req, res) => {
    console.log(req.file.path);
    const post = {
        title: req.body.title,
        image: req.body.image,
        body: req.body.body,
        date: new Date(),
        likes: [],
    };
    res.json({ status: "posted", image: req.file.path });
});
module.exports = router;
