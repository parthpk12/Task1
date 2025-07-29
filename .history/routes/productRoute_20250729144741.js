const express = require("express");
const productRouter = express.Router();
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const checkRole = require("../middlewares/checkRolemiddleware");
const checkAuth = require("../middlewares/tokenmiddleware");

productRouter.post(
  "/create",
  checkAuth,
  checkRole(["Admin", "Product manager"]),
  createProduct
);

productRouter.get("/getProducts", checkAuth, getAllProducts);

productRouter.delete(
  "/delete/:id",
  checkAuth,
  checkRole(["Admin","Product manager"]),
  deleteProduct
);

productRouter.put(
  "/update/:id",
  checkAuth,
  checkRole(["Admin", "Product manager"]),
  updateProduct
);

productRouter.post("/produ")


module.exports = productRouter;
