const express = require("express");
const app = express();
// require("./utils/initDb");
// const main = require("./utils/db");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const stockRouter = require("./routes/stockRoute");
const adminRouter = require("./routes/adminRoute");
require("dotenv").config();


app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/stock", stockRouter);
app.use("/admin", adminRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is listening at PORT ${process.env.PORT}`);
});
