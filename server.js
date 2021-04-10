const bodyParser = require("body-parser"),
    express = require("express"),
    app = express();
app.use(bodyParser.json());

const port = 8080 || process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
