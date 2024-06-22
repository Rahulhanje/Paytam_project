const express=require("express");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router=express.Router();
    
router.get("/balance",authMiddleware,async(req,res)=>{
  const account=await Account.findone({
      userId:req.userId
  });
  res.json({
    balance:account.balance
  })
});

router.post("/transfer",authMiddleware, async(req,res)=>{
    const session=await mongoose.startSession();
    session.abortTransaction();
    const {amount,to}=req.body;
    const account=Account.findOne({
        userId:req.userId
    });
    if(account.balance<amount){
        return res.status(400).json({
            message:"Insufficient Balance"
        })
    }
    const toAccount=await Account.findOne({
        userId:to
    });
    if(!toAccount){
        return res.status(400).json({
            message:"Invalid Account"
        })
    }
    await Account.updateOne({
        userId:req.userId,
    },{
        $inc:{
            balance:-amount
        }
    })
    await Account.updateOne({
        userId:to},{
            $inc:{
                balance:amount
            }
    })
    await session.commitTransaction();
    res.json({
        message:"Transfer successFul"
    }
    );
});


module.exports=router;