const express = require("express");
const checkAuth = require("../middlewares/tokenmiddleware");
const userRouter = express.Router();
const {
  userRegister,
  userLogin,
  assignRole,
  userLogout
} = require("../controllers/userController");

userRouter.post("/register", userRegister);

userRouter.post("/login",userLogin);

userRouter.post("/logout", checkAuth , userLogout);

userRouter.post("/assignRole", assignRole);

module.exports = userRouter;
