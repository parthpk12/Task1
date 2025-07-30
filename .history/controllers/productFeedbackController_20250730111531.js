const db = require("../configs/db");

const GetAllFeedbacks  = async (req,res) => {
 try{ 
   const {rows:allFB} = await db.query("select u.username , u.email , p.name , p.price , pf.feedback from product_feedback pf join users u on pf.user_id = u.id join products p on pf.product_id = p.id");

   res.json({
    message : "All data fetched successfully",
     data : allFB
   })
 }
 catch(err){
  console.log("Error"+err.message);
  res.send("Error fetching all product feedbacks");
 }
};


const getAllFeedBacksByProductId = async (req, res) => {
  try {

     const {pid:ProductId} = req.params;

     const { rows: allFB} = await db.query(
       "select u.username , u.email , p.name , p.price , pf.feedback from product_feedback pf join users u on pf.user_id = u.id join products p on pf.product_id = p.id where product_id = $1",[ProductId]
     );

     res.json({
      message : "All Feedbacks fetched successfully",
      data : allFB
     });

  } catch (err) {
    console.log("Error" + err.message);
    res.send("Error fetching product feedbacks by product id");
  }
};

const getAllFeedBacksByUserId = async (req,res) =>{
    try{

     const {uid:UserId} = req.params;

     if(!UserId){
      return res.send("No UserId present")
     }

     const {rows:allFB} = await db.query("select u.username,u.email,p.name,p.price,pf.feedback from feedback fb join users on fb.user_id  = u.id join products on fb.product_id = p.id where user_id = $1",[UserId]);

     res.json({
      message: "All Product Feedbacks fetched by UserId",
      data : allFB
     })

    }
    catch(err){
     console.error("Error"+err.message);
     res.send("Error fetching Product Feedbacks by userId");
    }
}

module.exports = {GetAllFeedbacks , getAllFeedBacksByProductId , getAllFeedBacksByUserId};