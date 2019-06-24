
var yelpcamp = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware gose here

var middleware = {};

middleware.checkOwnership = function (req, res, next) {
    //is user logged in
    if (req.isAuthenticated()) {
        //Edit campground
        yelpcamp.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //is user own the campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "you dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middleware.checkCommentOwnership = function (req, res, next) {
    //is user logged in
    if (req.isAuthenticated()) {
        //Edit campground
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                //is user own the campground
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "you don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "you need to be logged in to do that.");
        res.redirect("back");
    }
}

middleware.isLogin = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}

module.exports = middleware;