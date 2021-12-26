// Requiring packages

// require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const bcrypt = require("bcrypt");
const saltRounds = 10;
const moment = require("moment");
const Env = require("./models/posts");
const User = require("./models/user");
const Comment = require("./models/comments");
const Like = require("./models/likes");
const Dislike = require("./models/dislikes");

// Initialization 

const app = express();

const mongoURI = "mongodb://localhost:27017/sessions";

mongoose.connect(mongoURI, { useNewUrlParser: true }, function() {
    console.log("MongoDB connected");
});

const store = new MongoDBSession({
    uri: mongoURI,
    collection: "mySessions"
});

app.use(session({
    secret: "This is my secret message that is secret, huh.",
    resave: false,
    saveUninitialized: false,
    store: store
}));

const isAuth = function (req, res, next) {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect("/login");
    }
}

// const currentDate = moment().format("LLLL");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}));

app.use(express.static("public"));

///////////////////////////////////////////////////////////// GET METHOD /////////////////////////////////////////////////////////////

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.get("/main", isAuth, function (req, res) {
    Env.find({ "post": { $ne: null } }, function (err, foundPosts) {
        if (err) {
            console.log(err);
            res.render("404");
        } else {
            if (foundPosts) {
                res.render("main", { userPost: foundPosts });
            }
        }
    });
});

app.get("/user", isAuth, function (req, res) {
    Env.find({ "post.postUser": { $eq: req.session.username } }, function (err, foundUser) {
        if (err) {
            console.log(err);
            res.render("404");
        } else {
            if (foundUser) {
                res.render("user", { user: foundUser, firstname: req.session.firstname, lastname: req.session.lastname, username: req.session.username, email: req.session.email });
            }
        }
    });
});

app.get("/404", function(req, res) {
    res.render("404");
});

///////////////////////////////////////////////////////////// POST METHOD /////////////////////////////////////////////////////////////

app.post("/register", function (req, res) {
    User.findOne({ username: req.body.username }, function (err, foundUsername) {
        if (err) {
            console.log(err);
            res.render("404");
        } else {
            if (foundUsername) {
                res.redirect("/register");
            } else {
                User.findOne({ email: req.body.email }, function (err, foundEmail) {
                    if (err) {
                        console.log(err);
                        res.render("404");
                    } else {
                        if (foundEmail) {
                            res.redirect("/register");
                        } else {
                            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                                const newUser = new User({
                                    firstname: req.body.firstname,
                                    lastname: req.body.lastname,
                                    username: req.body.username,
                                    email: req.body.email,
                                    password: hash
                                });
                                newUser.save();
                                res.redirect("/login");
                            });
                        }
                    }

                });
            }
        }
    });
});

app.post("/login", function (req, res) {
    // var newUsername = req.body.loginUser;
    // var newPassword = req.body.loginPassword;
    User.findOne({ username: req.body.username }, function (err, foundUsername) {
        if (err) {
            console.log(err);
            res.render("404");
        } else {
            if (foundUsername) {
                bcrypt.compare(req.body.password, foundUsername.password, function (err, result) {
                    if (result === true) {
                        req.session.isAuth = true;
                        req.session._id = foundUsername._id;
                        req.session.firstname = foundUsername.firstname;
                        req.session.lastname = foundUsername.lastname;
                        req.session.username = foundUsername.username;
                        req.session.email = foundUsername.email;
                        req.session.date = moment().format("LLLL");
                        console.log(req.session.username + " IS LOGGED IN.")
                        res.redirect("/main");
                    } else {
                        // res.json({newErr: "Username or password is incorrect"});
                        res.redirect("/login");
                        
                        // res.redirect("/login", { isAlert: true, alertTitle: "Oops!" });
                    }
                });
            } else {
                // res.json({newErr: "Username or password is incorrect"});

                res.redirect("/login");
            }
        }
    });
});

app.post("/logout", function (req, res) {
    console.log(req.session.username + " IS LOGGED OUT.")
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.render("404");
        } else {
            res.redirect("/");
        }
    });
});

app.post("/post", function (req, res) {
    const posted = req.body.post;
    const newPost = new Env({
        post: {
            postUser: req.session.username,
            postMaterial: posted,
            date: moment().format("LLLL")
        }
    });
    newPost.save();
    res.redirect("/main");
});





// Listening PORT

app.listen(3000, function () {
    console.log("This server started on port 3000");
});