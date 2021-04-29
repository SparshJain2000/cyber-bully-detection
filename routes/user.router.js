const router = require("express").Router(),
    verifyToken = require("../middleware/auth"),
    User = require("../models/user.model");

router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }).lean();
        return res.json({ users: users });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { password: 0 }).lean();
        if (!user) throw new Error("USER_NOT_FOUND");
        return res.json({ user: user });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
router.post("/follow", verifyToken, async (req, res) => {
    try {
        if (!req.isAuth) throw new Error("NOT_AUTHORIZED");
        const foll = await User.findById(req.body.id); //J
        const current = await User.findById(req.user.id); //R
        console.log(
            current.following.map((x) => x.id + ""),
            req.body.id,
        );
        if (current.following.map((x) => x.id).includes(req.body.id))
            throw new Error("ALREADY_FOLLOWING");

        current.following.push({ id: req.body.id, username: foll.name });
        foll.followers.push({ id: req.user.id, username: current.name });
        await current.save();
        await foll.save();
        return res.json({ status: "DONE" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
module.exports = router;
