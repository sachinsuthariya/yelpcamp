var express = require("express");
var router = express.Router({mergeParams: true});
var yelpcamp = require("../models/campground");
var Comment = require("../models/comment");
var  middleware = require("../middleware")

// comments routes

// comment form
router.get("/new", middleware.isLogin, function (req, res) {

    yelpcamp.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log("err::", err);
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    });

});


// comment post
router.post("/", function (req, res) {
    yelpcamp.findById(req.params.id, function (err, campground) {
        if (err) {
            
            console.log("err::", err);
            res.redirect("/camp");
        } else {
            
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log("err::", err);
                } else {
                        
                // add username in to comment
                    // console.log("new comment user will be: "+ req.user.username);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save(); 
                //save comment 

                    campground.comments.push(comment);
                    campground.save();
                    // console.log("******************",comment);
                    req.flash("success", "Successfully added Comment.");
                    res.redirect("/camp/" + campground._id);
                }
            });
        }
    });
    // console.log("hey we are in post");
    // res.send("hey we are in post");

});

//comment edit form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
    // res.send("apun comment form hai");
});

//commet update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // res.send("hay this is post comment");
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
        if(err){
        }else{  
            res.redirect("back");
            res.redirect("/camp/" + req.params.id);
            // res.send("data  updaatede successfully");
        }
    })
});

// delete comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment Deleted.")
            res.redirect("/camp/"+ req.params.id);
        }
    });
});


//comment middleware
// function isLogin(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next(); 
//     }
//     res.redirect("/login");
// }

// //check comments owner ship

// function checkCommentOwnership(req, res, next) {
//     //is user logged in
//     if (req.isAuthenticated()) {
//         //Edit campground
//         Comment.findById(req.params.comment_id, function(err, foundComment) {
//             if (err) {
//                 res.redirect("back");
//             } else {
//                 //is user own the campground
//                 if (foundComment.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         res.redirect("back");
//     }
// }


module.exports = router;