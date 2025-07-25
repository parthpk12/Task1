const jwt  = require("jsonwebtoken");

const checkAuth  = async (req,res,next) => {
    try{
     const {token} = req.cookies;
     console.log("token is there ",token);

     if(!token){
      return res.send("token is not present");
     }

     const decoded = jwt.verify(token,process.env.JWT_SECRET);
     req.user = decoded;
     next(); 
 }
 catch(err){
  res.send("Invalid token"+err.message);
 }
}

module.exports = checkAuth;