const express = require("express");
const checkauthRouter = express.Router();
const checkAuth = require("../middlewares/tokenmiddleware");
const db = require("../configs/db");

checkauthRouter.get("/", checkAuth, async (req, res) => {
  try {
    const user = req.user;
    const {token}  = req.cookies;

    const { rows: roles } = await db.query(
      "select r.title from user_roles ur join roles r on ur.role_id = r.id where ur.user_id = $1 ",
      [user.id]
    );

    console.log(roles);

    const userRoles = [...new Set(roles.map((r) => r.title))];

    res.json({
      success: true,
      data: {
       token : token,
        roles: userRoles,
      },
    });
  } catch (err) {
    res.send("Error : " + err.message);
  }
});

module.exports = checkauthRouter;
