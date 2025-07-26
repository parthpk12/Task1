const express = require("express");
const app = express();
// require("./utils/initDb");
// const main = require("./utils/db");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const stockRouter = require("./routes/stockRoute");
const adminRouter = require("./routes/adminRoute");
const cors = require("cors");
const checkAuth = require("./middlewares/tokenmiddleware");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/stock", stockRouter);
app.use("/admin", adminRouter);
app.use("/checkauth",checkAuth,async(req,res) => {
      try{
            const user = req.user;

            const {rows : roles} = await db.query(
                    "select r.title from user_roles ur join roles r on ur.role_id = r.id where ur.user_id = $1 ",
                    [user.id]
                  );
                  
            console.log(roles);
            
            const userRoles = [...new Set(roles.map(r => r.title))];

            res.json({
              message : "Auth success",
              data : {
                  user : user,
                  roles : userRoles
              }
            })

      }catch(err){
            res.send("Error : "+err.message);
      }
})

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at PORT ${process.env.PORT}`);
});
