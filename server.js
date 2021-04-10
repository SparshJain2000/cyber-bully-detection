const bodyParser = require("body-parser"),
    express = require("express"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    postRouter = require("./routes/post.router"),
    userRouter = require("./routes/user.router"),
    app = express();
require("dotenv").config();
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept",
    );
    next();
});
app.use(bodyParser.json());
app.use("/data", express.static("data"));
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
