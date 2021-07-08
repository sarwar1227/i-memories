const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signin = async(req,res)=>{
    const {email,password } = req.body;
    try{
         const existingUser = await User.findOne({email});
         
         if(!existingUser) res.status(404).json({message: "User Doesn't Exist"});
         
         const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
         
         if(!isPasswordCorrect) res.status(400).json({message: "Invalid Credentials"})

         const token = jwt.sign({email:existingUser.email,id:existingUser._id},process.env.SECRET_KEY,{expiresIn:"1h"});

         res.status(200).json({result:existingUser,token:token})

    }catch(err){
         res.status(500).json({message: 'Something went wrong'});
    }
}
const signup = async(req,res)=>{
    const {email,password ,firstName,lastName,confirmPassword } = req.body;
    try{
         const existingUser = await User.findOne({email});
         
         if(existingUser){ 
             res.status(400).json({message: "User Already Exist"});
         }
         
         if(password!==confirmPassword){ 
             res.status(400).json({message: "Passwords Don't Match"})
         }
         
         const hashedPassword = await bcrypt.hash(password,12);
         
         const result = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})

         const token = jwt.sign({email:result.email,id:result._id},process.env.SECRET_KEY,{expiresIn:"1h"});

         res.status(200).json({result,token})

    }catch(err){
         console.log(err);
         res.status(500).json({message: 'Something went wrong'});
    }
}

module.exports = { signin,signup }