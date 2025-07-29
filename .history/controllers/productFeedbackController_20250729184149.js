const db = require("../configs/db");

const GetAllFeedbacks  = async (req,res) => {
 try{ 
   const {rows:allFeedBacks} = await db.query("select u.username , u.email , p.name , p.price ,   from product_feedback");

   res.json({
    message : "All data fetched successfully",
     data : allFeedBacks
   })
 }
 catch(err){
  console.log("Error"+err.message);
  res.send("Error fetching all product feedbacks");
 }
}


module.exports = {GetAllFeedbacks};