var mongo = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "abc",
        img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "xyz",
        img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "pqr",
        img: "https://blog-assets.thedyrt.com/uploads/2019/02/oregon-mineral-camp-campground_6912f061032adb1eef84c08fae60ce9c.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }

];

function seedDB(){
    Campground.deleteMany({}, function(err){
        // console.log("remove campground!");

        // //data created in campground
        // data.forEach(element => {
        //     Campground.create(element, function(err, cmp){
        //         console.log(cmp);
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log("Data Added Successfully");
        //             // create Comments
        //             Comment.create({
        //                 text: "Good Morning",
        //                 author: "Homer"
        //             }, function(err, data){
        //                 if(err){
        //                     console.log("err::", err);
                            
        //                 }else{
        //                     // console.log("**",Campground.comments);
                            
        //                     cmp.comments.push(data);
        //                     cmp.save();
        //                     // console.log("createde new Comment ::", Campground);    
        //                 }
                        
        //             });
        //         }
        //     });
        // });
        //data created End in Campground

    });

    
}

module.exports = seedDB;
