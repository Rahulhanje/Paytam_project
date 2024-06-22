const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://rahulhanje07:Rahul9901%40@cluster0.yklvimw.mongodb.net/Paytm");

const databaseSChema=mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
});

const user=mongoose.model('Userdata',databaseSChema);
module.exports={
    user
}
