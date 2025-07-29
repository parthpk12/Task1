const express = require("express");
const checkAuth = require("../middlewares/tokenmiddleware");
const checkRole = require("../middlewares/checkRolemiddleware");
const {
  getAllUsers,
  deleteUser,
  addRole,
  deleteRole,
  assignRole
} = require("../controllers/adminController");
const adminRouter = express.Router();

adminRouter.get("/getAllUsers", checkAuth, checkRole(["Admin"]), getAllUsers);

adminRouter.delete(
  "/deleteUser/:id",
  checkAuth,
  checkRole(["Admin"]),
  deleteUser
);

adminRouter.post("/addRole", checkAuth, checkRole(["Admin"]), addRole);

adminRouter.delete(
  "/deleteRole/:id",
  checkAuth,
  checkRole(["Admin"]),
  deleteRole
);

userRouter.post("/assignRole", checkAuth , che assignRole);


module.exports = adminRouter;
