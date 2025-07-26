const express = require("express")


app.get("/", checkAuth, async (req, res) => {
  try {
    const user = req.user;

    const { rows: roles } = await db.query(
      "select r.title from user_roles ur join roles r on ur.role_id = r.id where ur.user_id = $1 ",
      [user.id]
    );

    console.log(roles);

    const userRoles = [...new Set(roles.map((r) => r.title))];

    res.json({
      message: "Auth success",
      data: {
        user: user,
        roles: userRoles,
      },
    });
  } catch (err) {
    res.send("Error : " + err.message);
  }
});
