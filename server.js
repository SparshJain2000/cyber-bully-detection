const bodyParser = require("body-parser"),
    express = require("express"),
    postRouter = require("./routes/post.router"),
    userRouter = require("./routes/user.router"),
    app = express();
require("dotenv").config();
app.use(bodyParser.json());
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

const port = 8080 || process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
