const router = require("express").Router(),
    verifyToken = require("../middleware/auth"),
    User = require("../models/user.model");

router.get("/", async (req, res) => {
    const users = await User.find().lean();
    return res.json({ users: users });
});
router.post("/follow", verifyToken, async (req, res) => {
    const foll = await User.findById(req.body.id); //J
    const current = await User.findById(req.user.id); //R

    current.following.push({ id: req.body.id, username: foll.name });
    foll.followers.push({ id: req.user.id, username: current.name });
    // await current.save();
    // await foll.save();
    // console.log(current.following, foll.followers);
    return res.json({ status: "DONE" });
});
module.exports = router;
