const db = require("../configs/db");

const GetAllFeedbacks  = async (req,res) => {
 try{ 
   const {rows:allFeedBacks} = await db.query("select u.username , u.email , p.name , p.price , pf.feedback from product_feedback pf join users u on pf.user_id = u.id join products p on pf.product_id = p.id");

   res.json({
    message : "All data fetched successfully",
     data : allFeedBacks
   })
 }
 catch(err){
  console.log("Error"+err.message);
  res.send("Error fetching all product feedbacks");
 }
};


const getAllFeedBacksById = async (req,res) => {
 try{

 }
 catch(err){
  console.log("Error"+err.message);
  res
 }
}




module.exports = {GetAllFeedbacks};