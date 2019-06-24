var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongo = require("mongoose"),
    passport = require("passport"),
    LocalStratrgy = require("passport-local"),
    methodOverride = require("method-override"),
    yelpcamp = require("./models/campground");
    flash   = require("connect-flash");
Comment = require("./models/comment"),
    User = require("./models/user");
seedDB = require("./seeds");

// passport configuration

app.use(require("express-session")({
    secret: "Hello Good Morning",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));
passport.use(new LocalStratrgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

mongo.connect("mongodb://localhost/camp", {
    useNewUrlParser: true
});

app.use(bodyparser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


// seedDB();  // seed the database


var campgroundRoutes = require("./routes/campground"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index")

app.use(indexRoutes);
app.use("/camp", campgroundRoutes);
app.use("/camp/:id/comments", commentRoutes);

app.listen("7000", function () {
    console.log("Server Started");
});
// yelpcamp.create({
//     name: "India",
//     img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg",
//     description: "This is the buetifull Yelp camps post."
// }, function(err, abc){
//     if(err){
//         console.log("something is wrong");
//     }else{
//         console.log(abc);
//     }
// });


// var camp = [
//     {name: "camp1", img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg"},
//     {name: "camp2", img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg"},
//     {name: "camp3", img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg"},
//     {name: "camp1", img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg"},
//     {name: "camp2", img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg"},
//     {name: "camp3", img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg"},
//     {name: "camp1", img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg"},
//     {name: "camp2", img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg"},
//     {name: "camp3", img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg"}
// ];



// app.get("/yelp", function(req, res){
//     var camp = [
//         {name: "camp1", img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fnewhampshirestateparks.reserveamerica.com%2Fwebphotos%2FNH%2Fpid270015%2F0%2F540x360.jpg&imgrefurl=https%3A%2F%2Fnewhampshirestateparks.reserveamerica.com%2Fcamping%2Fdry-river-campground%2Fr%2FfacilityDetails.do%3FcontractCode%3DNH%26parkId%3D270015&docid=CMFJr0Jxi8WJ2M&tbnid=uktljbTakIf6mM%3A&vet=10ahUKEwjq-IidmOjiAhUCWCsKHSBlDzwQMwh7KAIwAg..i&w=540&h=359&bih=981&biw=1853&q=campgrounds&ved=0ahUKEwjq-IidmOjiAhUCWCsKHSBlDzwQMwh7KAIwAg&iact=mrc&uact=8"},
//         {name: "camp2", img: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fhaulihuvila.com%2Fwp-content%2Fuploads%2F2012%2F09%2Fhauli-huvila-campgrounds-lg.jpg&imgrefurl=http%3A%2F%2Fhaulihuvila.com%2Finformation%2Fcampgrounds%2F&docid=7DB-hjB5v_McPM&tbnid=oZhkZAcubx2szM%3A&vet=10ahUKEwjq-IidmOjiAhUCWCsKHSBlDzwQMwh-KAUwBQ..i&w=960&h=640&bih=981&biw=1853&q=campgrounds&ved=0ahUKEwjq-IidmOjiAhUCWCsKHSBlDzwQMwh-KAUwBQ&iact=mrc&uact=8"},
//         {name: "camp3", img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.visitflorida.com%2Fcontent%2Fvisitflorida%2Fen-us%2Fplaces-to-stay%2Fcampgrounds-florida%2F_jcr_content%2Ffull_width%2Fvf_image.img.1280.500.jpg&imgrefurl=https%3A%2F%2Fwww.visitflorida.com%2Fen-us%2Fplaces-to-stay%2Fcampgrounds-florida.html&docid=rPafg9gkbXyHLM&tbnid=Z1clArEUZLaW9M%3A&vet=10ahUKEwjq-IidmOjiAhUCWCsKHSBlDzwQMwiIASgPMA8..i&w=1280&h=500&bih=981&biw=1853&q=campgrounds&ved=0ahUKEwjq-IidmOjiAhUCWCsKHSBlDzwQMwiIASgPMA8&iact=mrc&uact=8"}
//     ];
//     res.render("landing");
// });



