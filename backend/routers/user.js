const express=require("express");
const {user,Account}=require("../db");
const jwt=require("jsonwebtoken");
const { ParseStatus } = require("zod");
const zod=require("zod");
const JWT_screet = require("./config");

const { authMiddleware } = require("./middleware");

const router=express.Router();
const singupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(8),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/singup",async(req,res)=>{
    const body=req.body;
    const {success}=singupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    const existuser=await user.findOne({
        username:body.uusername
    })
    if(existuser){
        return res.json({
              message:"User already exist"
        })
    }
    const dbuser=await user.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
     
    const userId=user._id;
   ///creating new account
    await Account.create({
        userId,
        balance:1+Math.random()*10000

    });
    
    const token=jwt.sign({
        userId
    },JWT_screet);
    res.status(200).json({
        message:"User Created",
        token:token
    })



});

const siginbody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})
router.post("/signin",async(req,res)=>{
    const body=req.body();
    const {success}=siginbody.safeParse(body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect Inputs"
        })
    }
    const user=await user.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(user){
        const toekn=jwt.sign({
            userId:user._id
        },JWT_screet);
        res.json({
            token:toekn
        })
        return;
    }
    res.status(411).json({
        message:"Error while Loggoing in"
    })

})

const updatebody=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    laststName:zod.string().optional()
});
router.put("/",authMiddleware,async (req,res)=>{
    const {success}=updatebody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Error while updating information"
        })

    }
    await user.updateOne(req.body,{
        id:req.userId
    })
    res.json({
        message: "Updated successfully"
    })
});

router.get("/bulk",async(res,res)=>{
    const filter=req.query.filter || "";
    const users=await user.find({
        or:[{
            firstName:{
                "$regex":filter,
                // $options: "i"
            }

        },{
            lastName:{
                "$regex":filter,
                 //$options: "i"
            }
        }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName
        }))
    })
});

module.exports=router;