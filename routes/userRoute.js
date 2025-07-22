const express = require("express");
const userRouter = express.Router();
const {
  userRegister,
  userLogin,
  assignRole,
  userLogout
} = require("../controllers/userController");

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout",userLogout);
userRouter.post("/assignRole", assignRole);

module.exports = userRouter;
