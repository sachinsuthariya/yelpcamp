var mongo = require("mongoose");

var commentSchema = mongo.Schema({
    text: String,
    author: {
        id: {
            type: mongo.Schema.Types.ObjectId,
            ref: "User"
        },
    username: String
    }
});

module.exports = mongo.model("Comment", commentSchema);