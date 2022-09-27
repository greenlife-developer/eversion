require('dotenv').config({
    path: './config_files/.env'
})
const express = require("express");
const router = express.Router()

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);

let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City

const util = require("util");
const multer = require("multer");

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const mongoClient = mongodb.MongoClient;
const fs = require("fs");

const unlinkFile = util.promisify(fs.unlink);
const upload = multer({ dest: "./uploads" });

const { uploadFile, getFileStream } = require("../s3bucket");
const bcrypt = require("bcrypt");


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

// const db = process.env.MONGO_URI;
const db = "mongodb://localhost:27017";

mongoClient.connect(
    db,
    { useUnifiedTopology: true },
    function (error, client) {
        if (error) {
            console.log(error);
            return;
        }
        database = client.db("eversion");

        router.get("/", (req, res) => {
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
                                "isLogin": true,
                                "query": req.query,
                                "states": State.getStatesOfCountry("NG"),
                                "user": user,
                                "users": users,
                            });
                        });
                    } else {
                        res.json({
                            "isLogin": false,
                            "query": req.query,
                            "states": State.getStatesOfCountry("NG"),
                            "users": users,
                        });
                    }
                });
        });

        router.get("/register", (req, res) => {
            res.json({
                "states": State.getStatesOfCountry("NG")
            });
        });

        router.post("/register", (req, res) => {
            const states = State.getStatesOfCountry("NG")
            const state = states.filter(sta => {
                return sta.name === req.body.state
            })

            const city = City.getCitiesOfState("NG", state[0].isoCode)

            const newCity = city.filter(cit => {
                return cit.name === req.body.city
            })
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
                                    state: state,
                                    city: newCity,
                                    address: req.body.address,
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

        router.post("/login", (req, res) => {
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

        router.get("/logout", (req, res) => {
            req.session.destroy();
            res.redirect("/");
        });

        router.post("/upload", upload.single("images"), async (req, res) => {

            const states = State.getStatesOfCountry("NG")
            const state = states.filter(sta => {
                return sta.name === req.body.state
            })

            const city = City.getCitiesOfState("NG", state[0].isoCode)

            const newCity = city.filter(cit => {
                return cit.name === req.body.city
            })

            if (req.session.user_id) {
                const file = req.file
                const result = await uploadFile(req.file);
                await unlinkFile(file.path);

                const number = req.body.number;
                const firstName = req.body.firstName
                const lastName = req.body.lastName
                const email = req.body.email
                const fullName = firstName + " " + lastName;
                const emailData = {
                    from: "yemijoshua81@gmail.com",
                    to: email,
                    subject: "New Customer request: Needs a cloth",
                    html: `
                            <h1>New Request by ${fullName}</h1>
                            <h5>Please let me know if you can sow this</h5>
                            <img src=${result.Location} alt="Uploaded_imgage"/>
                        `
                }

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

                getUser(req.session.user_id, (user) => {
                    delete user.password;
                    const currentTime = new Date().getTime();

                    database.collection("eversionUploads").insertOne(
                        {
                            number: number,
                            state: state,
                            city: newCity,
                            address: req.body.address,
                            filePath: `/images/${result.key}`,
                            user: user,
                            createdAt: currentTime,
                        },
                        (err, data) => {
                            res.redirect("/?message=image_uploaded");
                        }
                    );

                });
            } else {
                console.log("Please register")
                res.redirect("/login?error=not_exist")
            }
        });

        router.get("/book", (req, res) => {
            database
                .collection("eversionUploads")
                .find()
                .sort({
                    productName: 1
                })
                .toArray((err, uploads) => {
                    database
                        .collection("bookings")
                        .find()
                        .sort({
                            createdAt: -1
                        })
                        .toArray((err, booked) => {
                            if (req.session.user_id) {
                                getUser(req.session.user_id, function (user) {
                                    res.json({
                                        "isLogin": true,
                                        "query": req.query,
                                        "uploads": uploads,
                                        "states": State.getStatesOfCountry("NG"),
                                        "user": user,
                                        "booked": booked,
                                    });
                                });
                            } else {
                                res.json({
                                    "isLogin": false,
                                    "query": req.query,
                                    "uploads": uploads,
                                    "states": State.getStatesOfCountry("NG"),
                                    "booked": booked,
                                });
                            }
                        })
                });
        })

        router.post("/book", upload.single("images"), async (req, res) => {
            const firstName = req.body.firstName
            const lastName = req.body.lastName
            const email = req.body.email
            const fullName = firstName + " " + lastName;
            const states = State.getStatesOfCountry("NG")
            const state = states.filter(sta => {
                return sta.name === req.body.state
            })

            const city = City.getCitiesOfState("NG", state[0].isoCode)

            const newCity = city.filter(cit => {
                return cit.name === req.body.city
            })
            // console.log("New city",newCity)

            if (req.session.user_id) {
                const file = req.file
                const result = await uploadFile(req.file);
                await unlinkFile(file.path);

                const emailData = {
                    from: email,
                    to: "yemijoshua81@gmail.com",
                    subject: "New Customer request: New booking",
                    html: `
                            <h1>New Request by ${fullName}</h1>
                            <h5>Please let me know if you can sow this</h5>
                            <img src=${result.Location} alt="Uploaded_imgage"/>
                        `
                }
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

                getUser(req.session.user_id, (user) => {
                    delete user.password;
                    const currentTime = new Date().getTime();
                    database.collection("bookings").insertOne(
                        {
                            number: req.body.number,
                            filePath: file ? `/images/${result.key}` : null,
                            email: req.body.email,
                            sew: req.body.sew,
                            styles: req.body.styles,
                            measurement: req.body.measurement,
                            state: state,
                            city: newCity,
                            fabric: req.body.fabric,
                            address: req.body.address,
                            nostyle: req.body.nostyle,
                            user: user,
                            createdAt: currentTime,
                        },
                        (err, data) => {
                            res.redirect("/?message=booked_designer");
                        }
                    );
                });

            } else {
                console.log("user is not reqistered...")
            }

        })
    }
);

module.exports = router;