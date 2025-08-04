
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'nehapatel&isac@@l';

//middleware function 
fetchuser = (req,res,next)=>{

    //Get the user from the jwt token and add thier ID to the object req
    const token = req.header("auth-token");
    if(!token){
        //access denied -401
        return res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
    const data = jwt.verify(token,JWT_SECRET);
    req.user = data.user;
    next() ;// next fucntion a bo next fucntion ko call ker dega
    } catch (error) {
         return res.status(401).send({error:"please authenticate using a valid token"})
    }
   
}

module.exports = fetchuser