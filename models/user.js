var mongo = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongo.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongo.model("User", UserSchema);