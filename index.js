const express = require("express");
const app = express();
// const main = require("./utils/db");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const stockRouter = require("./routes/stockRoute")
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/stock", stockRouter);

// app.use("/adminCruds" , adminCruds);

app.listen(port, () => {
  console.log(`server is listening at PORT ${port}`);
});
