const db = require("../configs/db");

const getAllUsers = async (req, res) => {
  try {
    // const [usersData] = await db.query("select * from users");
    const { rows: usersData } = await db.query("SELECT * FROM users");

    res.json({
      message: "Users fetched successfully",
      data: usersData,
    });
  } catch (err) {
    res.send("problem for fetching problems" + err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("delete from users where id = $1", [id]);

    res.json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.send("Error for deleting user" + err.message);
  }
};

const addRole = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.send("No title is Present");
    }

    await db.query("insert into roles(title) values($1)", [title]);

    res.json({
      message: "Role added successfully",
    });
  } catch (err) {
    res.send("Error for adding role" + err.message);
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("delete from roles where id = $1", [id]);

    res.json({
      message: "Role deleted successfully",
    });
  } catch (err) {
    res.send("Error for delete role" + err.message);
  }
};

const assignRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    if (!user_id || !role_id) {
      return res.send("Missing fields");
    }

    await db.query("insert into user_roles(user_id , role_id) values($1,$2)", [
      user_id,
      role_id,
    ]);

    res.json({
      message: "Role assigned successfully",
    });
  } catch (err) {
    return res.send("Problem with the assign role" + err.message);
  }
};


module.exports = { getAllUsers, deleteUser, addRole, deleteRole };
