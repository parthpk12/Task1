const express = require("express");
const checkAuth = require("../middlewares/tokenmiddleware");
const userRouter = express.Router();
const {
  userRegister,
  userLogin,
  userLogout,
  ProductFeedbackGive,
  UpdateFeedbackByUserIdProductId
} = require("../controllers/userController");

userRouter.post("/register", userRegister);

userRouter.post("/login",userLogin);

userRouter.post("/logout", checkAuth , userLogout);

userRouter.post("/product_feedback/:pid",checkAuth,ProductFeedbackGive);


userRouter.put("/updateFeedback/:pid",UpdateFeedbackByUserIdProductId);


module.exports = userRouter;
