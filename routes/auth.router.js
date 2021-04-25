const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcrypt"),
    User = require("../models/user.model");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(500).json({ err: "INVALID_EMAIL" });
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) res.status(500).json({ err: "INVALID_PASSWORD" });
    const token = await jwt.sign(
        { userId: user.id, email: user.email, username: user.name },
        process.env.SECRET,
        { expiresIn: "1h" },
    );
    res.json({
        user: { userId: user.id, email: user.email, username: user.name },
        token,
        tokenExpiration: 1,
    });
});

router.post("/signup", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });
        if (user) res.status(500).json({ err: "EMAIL_EXISTS" });
        const hashed = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({
            ...req.body,
            password: hashed,
        });
        const result = await newUser.save();
        const token = jwt.sign(
            {
                userId: result.id,
                email: result.email,
                username: result.name,
            },
            process.env.SECRET,
            { expiresIn: "1h" },
        );
        res.json({
            userId: result.id,
            token,
            tokenExpiration: 1,
            isEmployer: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});
module.exports = router;
