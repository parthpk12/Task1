const validator = require("validator");
const bcrypt = require("bcrypt");
const db = require("../utils/db");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body);

    const [rows] = await db.query("select * from users where email = ?", [
      email,
    ]);
    // console.log("here is the rows",rows);
    // console.log("here is the data",rows[0]);
    if (rows[0]) {
      return res.send("User aleready exist");
    }

    if (!username || !email || !password) {
      return res.send("some fileds are missing");
    }

    if (!validator.isEmail(email)) {
      return res.send("email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      return res.send("use strong password");
    }

    const hash_pass = await bcrypt.hash(password, 10);

    await db.query(
      "insert into users (username , email , password) values (?,?,?)",
      [username, email, hash_pass]
    );

    res.json({ message: "User Registered" });
  } catch (err) {
    res.send("Problem for user register" + err.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send("some data missing");
    }

    const [userData] = await db.query("select * from users where email = ?", [
      email,
    ]);
    // console.log(userData[0]);

    if (!userData[0]) {
      return res.send("User not Found");
    }

    const isMatch = await bcrypt.compare(password, userData[0].password);
    if (!isMatch) {
      return res.send("Password is not valid");
    }

    const token = jwt.sign(
      { id: userData[0].id, email: userData[0].email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, { maxAge: 100 * 100 * 3600 });

    res.json({
      message: "Loggin successful",
    });
  } catch (err) {
    res.send("problem for Login" + err.message);
  }
};

const userLogout = async (req, res) => {
  try {
    const {token} = req.cookies;
    console.log("here is a token", token);

    res.clearCookie("token");

    res.json({
      message: "Logout Successfully",
    });
  } catch (err) {
    return res.send("Error for the logout");
  }
};

const assignRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    if (!user_id || !role_id) {
      return res.send("Missing fields");
    }

    await db.query("insert into user_roles(user_id , role_id) values(?,?)", [
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

module.exports = { userRegister, userLogin, assignRole, userLogout };
