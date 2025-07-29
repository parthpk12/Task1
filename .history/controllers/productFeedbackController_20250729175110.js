const db = require("../configs/db");

const GetAllFeedbacks  = async (req,res) => {
 try{ 
   const {rows:allFeedBacks} = await db.query("select *from product_feedback");

   res.json({
     
   })
 }
 catch(err){
  console.log("Error"+err.message);
  res.send("Error fetching all product feedbacks");
 }
}