const validator = require("validator");
const bcrypt = require("bcrypt");
const db = require("../configs/db");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    // console.log(req.body);

    // const [rows] = await db.query("select * from users where email = $1", [
    //   email,
    // ]);

    const { rows } = await db.query("select * from users where email = $1", [
      email,
    ]);
    if (rows[0]) {
      return res.send("User already exists");
    }
    // console.log("here is the rows",rows);
    // console.log("here is the data",rows[0]);
    // if (rows[0]) {
    //   return res.send("User aleready exist");
    // }

    if (!username || !email || !password) {
      return res.send("some fileds are missing");
    }

    email = email.trim().toLowerCase();

    if (!validator.isEmail(email)) {
      return res.send("email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      return res.send("use strong password");
    }

    const hash_pass = await bcrypt.hash(password, 10);

    await db.query(
      "insert into users (username , email , password) values ($1,$2,$3)",
      [username, email, hash_pass]
    );

    res.json({ message: "User Registered" });
  } catch (err) {
    res.send("Problem for user register" + err.message);
  }
};

const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.send("some data missing");
    }

    email = email.trim().toLowerCase();

    const { rows: userData } = await db.query(
      "select * from users where email = $1",
      [email]
    );
    console.log(userData[0]);

    const { rows: roles } = await db.query(
      "select r.title from user_roles ur join roles r on ur.role_id = r.id where ur.user_id = $1",
      [userData[0].id]
    );
    console.log(roles);
    
    let newRoles = [...new Set(roles.map(r => r.title))];
     

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None", 
      maxAge: 1000 * 60 * 60 * 24, 
    });

    res.json({
      message: "Login successful",
      user: {
        username: userData[0].username,
        email: userData[0].email,
        role: newRoles,
        token : token
      },
    });
  } catch (err) {
    res.send("problem for Login" + err.message);
  }
};

const userLogout = async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log("here is a token", token);

    res.clearCookie("token");

    res.json({
      message: "Logout Successfully",
    });
  } catch (err) {
    return res.send("Error for the logout");
  }
};

const ProductFeedbackGive = async () => {
  try{

    const {ProductId} = 

  }catch(err){
    console.error("Error:"+err.message);
    return res.send("Error for product feedback")
  }
}

module.exports = { userRegister, userLogin,  userLogout , ProductFeedbackGive };
