const bodyParser = require("body-parser"),
    express = require("express"),
    mongoose = require("mongoose"),
    postRouter = require("./routes/post.router"),
    userRouter = require("./routes/user.router"),
    app = express();
require("dotenv").config();
app.use(bodyParser.json());
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);
const MONGO_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.8bvsg.mongodb.net/cyber_bully_db?retryWrites=true&w=majority`;
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("connected to MONGO 🤩"))
    .catch((x) => console.log(x));
const port = 8080 || process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to ${port} `);
});
