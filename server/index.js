const express = require('express');
const app = express();

const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const mongoClient = mongodb.MongoClient;
const fs = require("fs");

const mainURL = "http://localhost:4000/";
let database = null;

let http = require('http').createServer(app);

app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "ejs")
app.use(express.json());

const expressSession = require("express-session");
app.use(expressSession({
    "key": "user_id",
    "secret": "User secret object ID",
    "resave": true,
    "saveUninitialized": true
}));


const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');
const { request } = require('http');
app.use(bodyParser.json({ limit: "10000mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10000mb", parameterLimit: 1000000 }));

function getUser(userId, callBack) {
    database.collection("users").findOne({
        "_id": ObjectId(userId)
    }, function (error, result) {
        if (error) {
            console.log(error);
            return;
        }
        if (callBack !== null) {
            callBack(result);
        }

    });
}



const db = require("./config/keys").mongoURI;
// const db = "mongodb://localhost:27017";

const PORT = process.env.PORT || 4000

http.listen(PORT, function () {
    console.log('Server has started...');

    mongoClient.connect(db, { useUnifiedTopology: true }, function (error, client) {
        if (error) {
            console.log(error);
            return;
        }
        database = client.db("eversion");

        app.get("/api", (req, res) => {


            database.collection("users").find().sort({
                "createdAt": -1
            }).toArray((err, users) => {
                if (req.session.user_id) {
                    getUser(req.session.user_id, function (user) {
                        res.json({
                            "isLogin": true,
                            "query": req.query,
                            "user": user,
                            "users": users
                        })
                    })
                } else { 
                    res.json({
                        "isLogin": false,
                        "query": req.query,
                        "users": users
                    })
                }
            })
        })

        app.get("/register", (req, res) => {
            res.json({
                "query": req.query
            })
        });

        app.post("/register", (req, res) => {

            database.collection("users").findOne({
                "email": req.body.email
            }, (err, user) => {
                if (user === null) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        database.collection("users").insertOne({
                            "firstName": req.body.fName,
                            "lasttName": req.body.lName,
                            "email": req.body.email,
                            "password": hash
                        }, (err, data) => {
                            console.log(err)
                            res.redirect("/login?message=registered");
                        })
                    })
                } else {
                    res.redirect("/register?error=exists");
                }
            })
        });

        app.get("/login", (req, res) => {
            res.json({
                "query": req.query
            })
        })

        app.post("/login", (req, res) => {
            const email = req.body.email;
            const password = req.body.password;

            database.collection("users").findOne({
                "email": email
            }, (err, user) => {
                if (user === null) {
                    res.redirect("/login?error=not_exists")
                } else {
                    bcrypt.compare(password, user.password, (err, isPasswordVerify) => {
                        if (isPasswordVerify) {
                            req.session.user_id = user._id;
                            res.redirect("/")
                        } else {
                            res.redirect("/login?error=wrong_password")
                        }
                    })
                }
            })
        })

        app.get("/logout", (req, res) => {
            req.session.destroy();
            res.redirect("/");
        })


    })
});