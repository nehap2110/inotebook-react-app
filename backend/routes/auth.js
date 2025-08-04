const express =  require('express')
const router = express.Router();
const User = require('../models/User');
//import express-validator
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); //import jwt token
const fetchuser = require('../middleware/fetchuser') //import karenge middleware function ko

//create ajwt secret
const JWT_SECRET = 'nehapatel&isac@@l';

//routers

//ROUTE 1.create a user using :POST /api/auth/createuser no login require
router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password',"password should be of at least 5 length").isLength({min:5})

], async (req,res)=>{
   let success = false
   // if thier are error return 404 bad request and the error
     const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({success,error :error.array()});
  }
   //check whether the user with this email exist already
   try{
      let user =  await User.findOne({email:req.body.email})
     if(user){
    return res.status(400).json({ success,error:"user with this email exist already"})
   }
   //generate salt
    const salt =  await bcrypt.genSalt(10);
     const secpass =  await bcrypt.hash(req.body.password,salt);
 
   //create user
    user = await User.create({
    name : req.body.name,
    email : req.body.email,
    password : secpass
  })
  // .then(User => res.json(User)).catch(err=>{console.log(err)
  //       res.json({error:"plase enter the unique email",message:err.message})})

  //we return a user id in jwt tokwn to a user back
  const data = {
    user:{
      id:user.id
    }
  }
  const authtoken = jwt.sign(data,JWT_SECRET);
  success = true
  // res.json(user)
   res.json({success,authtoken})

   }catch(error){
        console.log(error.message)
        res.status(500).send("error has been accured")
   }
});

//ROUTE 2.Authenticate a user using a POST : /api/auth/login - no login require
router.post('/login',[
  //email and password is required during login
    body('email','enter a valid email').isEmail(), 
    body('password',"password should not be blank").exists()

], async (req,res)=>{
    let success = false
   // if thier are error return 404 bad request and the error
     const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({success,error :error.array()});
  }
  const {email,password} = req.body
  try {
    //email fidn karenge 
   let user =  await User.findOne({email})
   //if email is not found
   if(!user){
    return res.status(400).json({success,error:"please try to login with correct email or password"})
   }
   //password compare karenge
   const passwordcompare =  await bcrypt.compare(password,user.password)
   if(!passwordcompare){
    
     return res.status(400).json({success,error:"please try to login with correct email or password"})
   }
   //if password and email both are matched then provide authentication token
   const data = {
       user:{
        id:user.id
       }
   }
   //sign karenge data ko jwt_secret se
   const authtoken = jwt.sign(data,JWT_SECRET)
    success = true
   res.json({success,authtoken})

  } catch (error) {
      console.log(error.message)
        res.status(500).send("internal server error")
  }
}
)

//ROUTE 3 - get aa user detail using POST - /getuser -login require
router.post('/getuser',fetchuser, async (req,res)=>{
  try {
    userID = req.user.id;
    const user =  await User.findById(userID).select("-password");
    res.send(user);

  } catch (error) {
    console.log(error.message)
        res.status(500).send("internal server error")
  }
})



 

module.exports = router;