var express = require("express");
var router = express.Router();
var  passport = require("passport");
var User = require("../models/user");
var  middleware = require("../middleware")
// Routes start from here...

//root route
router.get("/", function (req, res) {
    // res.send("Server Started");
    res.render("landing");
});




// register form
router.get("/register", function (req, res) {
    res.render("register");
});

//handling register
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });

    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            // console.log(err);
            req.flash("error", err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Wellcome to YelpCamp "+ user.username);
            res.redirect("/camp");
        });
    });
    // res.send("register post");
});


// login form 
router.get("/login", function (req, res) {
    res.render("login");
});

//login post
router.post("/login", passport.authenticate("local", {
    successRedirect: "/camp",
    failureRedirect: "/login"
}), function (req, res) {
    // res.send("i m login submit");
});

// route for logout
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/camp");
});

//middleware
// function isLogin(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports = router;