const db = require("../configs/db");

const GetAllFeedbacks  = async (req,res) => {
 try{ 
   await db.query("select *from ")
 }
 catch(err){
  console.log("Error"+err.message);
  res.send("Error fetching all product feedbacks");
 }
}