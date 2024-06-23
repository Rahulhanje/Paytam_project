const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://rahulhanje07:Rahul9901%40@cluster0.yklvimw.mongodb.net/Paytm");

const databaseSChema=mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
});

const accountSchema =mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        requrired:true
    },
    balance:Number
})
const Account=mongoose.model('Account',accountSchema);
const User=mongoose.model('Userdata',databaseSChema);
module.exports={
    User,
    Account,
};
