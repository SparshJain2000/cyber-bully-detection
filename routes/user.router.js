const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({
        _id: 123,
        name: "sparsh jain",
    });
});
module.exports = router;
