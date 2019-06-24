var mongo = require("mongoose");
// mongo.connect("mongodb://localhost")


var campSchema = new mongo.Schema({
    name: String,
    price: String,
    img: String,
    description: String,
    author: {
          id: {
               type: mongo.Schema.Types.ObjectId,
               ref: "User"
              },
          username: String 
          }, 

    comments: [
        {
          type: mongo.Schema.Types.ObjectId,
          ref: "Comment"
        }
      ]
});

// var  yelpcamp = mongo.model("yelpcamp", campSchema);

module.exports = mongo.model("yelpcamp", campSchema);
