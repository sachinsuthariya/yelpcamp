var express = require("express");
var router = express.Router();
var yelpcamp = require("../models/campground");
var middleware = require("../middleware");


// index page 
router.get("/", function(req, res) {
    // array of img should be declare here for locally 
    yelpcamp.find({}, function(err, allcamp) {
        if (err) {
            console.log("error in retrive all camp data");
        } else {
            res.render("campground/index", {
                data: allcamp
            });
        }
    });

});

//create camp
router.post("/", middleware.isLogin, function(req, res) {
    // res.send("You hit the pos route");

    //get a data from form to add in campground
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user.id,
        username: req.user.username
    };
    var newCamp = {
        name: name,
        img: img,
        price: price,
        description: desc,
        author: author
    };

    console.log("*****************8", newCamp);
    // create new campground and save to DB
    yelpcamp.create(newCamp, function(err, camp) {
        if (err) {
            console.log("something is wrong while creating new camp");
        } else {
            // console.log(camp);
            res.redirect("camp");
        }
    });
});

// camp form
router.get("/new", middleware.isLogin, function(req, res) {
    res.render("campground/newCamp");
});

router.get("/:id", function(req, res) {

    // var id = req.params.id;

    yelpcamp.findById(req.params.id).populate("comments").exec(function(err, foundcamp) {
        if (err) {
            console.log(err, "there is error in find camp");
        } else {
            console.log("data of find by id camps: ", foundcamp);
            res.render("campground/show", {
                foundcamp: foundcamp
            });
        }
    });
});


//Edit Campground
router.get("/:id/edit", middleware.checkOwnership, function(req, res) {

    //Edit campground
    yelpcamp.findById(req.params.id, function(err, foundCampground) {

        res.render("campground/edit", {
            campground: foundCampground
        });
    });
});


//update Campground

router.put("/:id", middleware.checkOwnership, function(req, res) {
    //find and update campground
    yelpcamp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCamp) {
        if (err) {
            res.redirect("/camp");
        } else {
            res.redirect("/camp/" + req.params.id);
        }
    })
    //redirect to campground
})


//destroy routes
router.delete("/:id", middleware.checkOwnership, function(req, res) {
    // res.send("you are trying to delete something");
    yelpcamp.findByIdAndDelete(req.params.id, function(err) {
        if (err) {
            res.redirect("/camp");
        } else {
            res.redirect("/camp");
        }
    })
});

//middleware
// function isLogin(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }

// //check campgrounds owner ship

// function checkOwnership(req, res, next) {
//     //is user logged in
//     if (req.isAuthenticated()) {
//         //Edit campground
//         yelpcamp.findById(req.params.id, function(err, foundCampground) {
//             if (err) {
//                 res.redirect("/camp");
//             } else {
//                 //is user own the campground
//                 if (foundCampground.author.id.equals(req.user._id)) {
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