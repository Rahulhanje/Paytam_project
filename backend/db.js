const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://rahulhanje07:Rahul9901%40@cluster0.yklvimw.mongodb.net/User");

const databaseSChema=mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String
});

const user=mongoose.model('Userdata',databaseSChema);
module.exports={
    user
}
