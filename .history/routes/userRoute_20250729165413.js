const express = require("express");
const checkAuth = require("../middlewares/tokenmiddleware");
const userRouter = express.Router();
const {
  userRegister,
  userLogin,
  userLogout,
  ProductFeedbackGive
} = require("../controllers/userController");

userRouter.post("/register", userRegister);

userRouter.post("/login",userLogin);

userRouter.post("/logout", checkAuth , userLogout);

userRouter.post("/  ",checkAuth,ProductFeedbackGive);


module.exports = userRouter;
