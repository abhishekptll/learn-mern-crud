const userModel = require("../models/userModel");

const userRegistration =async(req,res)=>{
   const {name,email,password}= req.body;
   const User =await userModel.create({
    name:name,
    email:email,
    password:password
   })
   res.status(201).json({
    msg:"you are successfully registered"
   })
};

const userLogin =async(req,res)=>{
   const {email,password}= req.body;
   const user= await userModel.findOne({
    email:email
   });
   if (!user){
    res.send("Invalid email");
   }
   if(user.password!=password){
    res.send("Invalid password");
   }
    res.status(202).send({msg:"you are successfull login"})

    console.log(user);
    res.send("okk");
}


module.exports={
    userRegistration,
    userLogin,
}