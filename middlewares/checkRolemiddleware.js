const db = require("../utils/db");

const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    // console.log(allowedRoles);
    try {
      console.log(req.user);

      // console.log("in the callback");
      const [roles] = await db.query(
        "select r.title from user_roles ur join roles r on ur.role_id = r.id where ur.user_id = ? ",
        [req.user.id]
      );

      console.log(roles);

      const userRoles = roles.map((r) => r.title);

      const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

      // console.log(hasAccess);

      if (!hasAccess) {
        return res.send("Access denied");
      }

      next();
    } catch (err) {
      res.send("Error for checking the role" + err.message);
    }
  };
};

module.exports = checkRole;
