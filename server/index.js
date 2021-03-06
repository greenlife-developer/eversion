require('dotenv').config({
    path: './config/.env'
})
const express = require("express");
const app = express();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);

const util = require("util");
const multer = require("multer");

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const mongoClient = mongodb.MongoClient;
const fs = require("fs");

const unlinkFile = util.promisify(fs.unlink);
const upload = multer({ dest: "./uploads" });

const { uploadFile, getFileStream } = require("./s3bucket");

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());

const mainURL = "http://localhost:4000/";
let database = null;

let http = require("http").createServer(app);

app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.json());

const expressSession = require("express-session");
app.use(
    expressSession({
        key: "user_id",
        secret: "User secret object ID",
        resave: true,
        saveUninitialized: true,
    })
);

const bcrypt = require("bcrypt");

const bodyParser = require("body-parser");
const { request } = require("http");
app.use(bodyParser.json({ limit: "10000mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "10000mb",
        parameterLimit: 1000000,
    })
);

function getUser(userId, callBack) {
    database.collection("users").findOne(
        {
            _id: ObjectId(userId),
        },
        function (error, result) {
            if (error) {
                console.log(error);
                return;
            }
            if (callBack !== null) {
                callBack(result);
            }
        }
    );
}

const db = require("./config/keys").mongoURI;
// const db = "mongodb://localhost:27017";

const PORT = process.env.PORT || 4000;

http.listen(PORT, function () {
    console.log("Server has started...");

    mongoClient.connect(
        db,
        { useUnifiedTopology: true },
        function (error, client) {
            if (error) {
                console.log(error);
                return;
            }
            database = client.db("eversion");

            app.get("/api", (req, res) => {
                database
                    .collection("users")
                    .find()
                    .sort({
                        createdAt: -1,
                    })
                    .toArray((err, users) => {
                        if (req.session.user_id) {
                            getUser(req.session.user_id, function (user) {
                                res.json({
                                    isLogin: true,
                                    query: req.query,
                                    user: user,
                                    users: users,
                                });
                            });
                        } else {
                            res.json({
                                isLogin: false,
                                query: req.query,
                                users: users,
                            });
                        }
                    });
            });

            app.get("/register", (req, res) => {
                res.json({
                    query: req.query,
                });
            });

            app.post("/register", (req, res) => {
                database.collection("users").findOne(
                    {
                        email: req.body.email,
                    },
                    (err, user) => {
                        if (user === null) {
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                database.collection("users").insertOne(
                                    {
                                        firstName: req.body.fName,
                                        lastName: req.body.lName,
                                        email: req.body.email,
                                        number: req.body.number,
                                        password: hash,
                                    },
                                    (err, data) => {
                                        console.log(err);
                                        res.redirect("/login?message=registered");
                                    }
                                );
                            });
                        } else {
                            res.redirect("/register?error=exists");
                        }
                    }
                );
            });

            app.get("/login", (req, res) => {
                console.log(req.body)
                res.json({
                    query: req.query,
                });
            });

            app.post("/login", (req, res) => {
                const email = req.body.email;
                const password = req.body.password;

                database.collection("users").findOne(
                    {
                        email: email,
                    },
                    (err, user) => {
                        if (user === null) {
                            res.redirect("/login?error=not_exists");
                        } else {
                            bcrypt.compare(
                                password,
                                user.password,
                                (err, isPasswordVerify) => {
                                    if (isPasswordVerify) {
                                        req.session.user_id = user._id;
                                        res.redirect("/");
                                    } else {
                                        res.redirect("/login?error=wrong_password");
                                    }
                                }
                            );
                        }
                    }
                );
            });

            app.get("/logout", (req, res) => {
                req.session.destroy();
                res.redirect("/");
            });

            app.post("/upload", upload.single("images"), async (req, res) => {

                if (req.session.user_id) {
                    const file = req.file;
                    const result = await uploadFile(req.file);
                    await unlinkFile(file.path);

                    const number = req.body.number;
                    const firstName = req.body.firstName
                    const lastName = req.body.lastName
                    const email = req.body.email
                    const fullName = firstName + " " + lastName;
                    const emailData = {
                        from: email,
                        to: "yemijoshua81@gmail.com",
                        subject: "New Customer request: Needs a cloth",
                        html: `
                                <h1>New Request by ${fullName}</h1>
                                <h5>Please let me know if you can sow this</h5>
                                <img src=${result.Location} alt="Uploaded_imgage"/>
                            `
                    }



                    getUser(req.session.user_id, (user) => {
                        delete user.password;
                        const currentTime = new Date().getTime();

                        database.collection("images").insertOne(
                            {
                                number: number,
                                filePath: `/images/${result.key}`,
                                user: user,
                                createdAt: currentTime,
                                likers: [],
                                comments: [],
                            },
                            (err, data) => {
                                res.redirect("/?message=image_uploaded");
                            }
                        );

                        sgMail.send(emailData).then(sent => {
                            return res.json({
                                message: `Email has been sent to ${email}`
                            })
                        }).catch(err => {

                            console.log(err, "Not allowed")
                            // return res.status(400).json({
                            //     error: "Can't send message to your client"
                            // })
                        })

                    });
                } else {
                    console.log("Please register")
                    res.redirect("/login?error=not_exist")
                }
            });
        }
    );
});

// 16e007779c2b2f33fa8dea43246ac9ca-us9
// 0758ba2e33