const jwt  = require("jsonwebtoken");

const checkAuth  = async (req,res,next) => {
 try{
     const {token} = req.cookies;

     if(!token){
      return res.send("token is not present");
     }

     const decoded = jwt.verify(token, "Parth@3232");
     req.user = decoded;
     next(); 
 }
 catch(err){
  res.send("Invalid token"+err.message);
 }
}

module.exports = checkAuth;