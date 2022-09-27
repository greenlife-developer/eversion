require('dotenv').config({
    path: './config_files/.env'
})
const express = require("express");
const app = express();

app.use(express.json());
const path = require("path")

const mainURL = "http://localhost:4000/";
let database = null;

let http = require("http").createServer(app);

app.use(express.json());

const expressSession = require("cookie-session");
app.use(
    expressSession({
        key: "user_id",
        secret: "User secret object ID",
        resave: true,
        saveUninitialized: true,
    })
);

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "10000mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "10000mb",
        parameterLimit: 1000000,
    })
);

app.use('/api', require("./routes/route"));
// --------------------------deployment------------------------------
// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------


const PORT = process.env.PORT || 4000;

http.listen(PORT, function () {
    console.log("Server has started...");
});

// 16e007779c2b2f33fa8dea43246ac9ca-us9
// 0758ba2e33