const express = require("express");
const app = express();
// require("./utils/initDb");
// const main = require("./utils/db");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const stockRouter = require("./routes/stockRoute");
const adminRouter = require("./routes/adminRoute");
const cors = require("cors");
const checkAuth = require("./middlewares/tokenmiddleware");
const checkauthRouter = require("./routes/checkauthRoute");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/product_feedback",)
app.use("/stock", stockRouter);
app.use("/admin", adminRouter);
app.use("/checkauth",checkauthRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at PORT ${process.env.PORT}`);
});


