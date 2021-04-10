const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({
        _id: 123,
        content: "lasfj",
    });
});

router.post("/", (req, res) => {
    const post = {
        title: req.body.title,
        image: req.body.image,
        body: req.body.body,
        date: new Date(),
        likes: [],
    };
    res.json({ status: "posted" });
});
module.exports = router;
