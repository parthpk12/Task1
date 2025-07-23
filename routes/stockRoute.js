const express = require("express");
const checkAuth = require("../middlewares/tokenmiddleware");
const checkRole = require("../middlewares/checkRolemiddleware");
const { createStock, updateStock, deleteStock, getAllStocks } = require("../controllers/stockController");
const stockRouter = express.Router();

stockRouter.post("/create",checkAuth,checkRole(["Order manager"]),createStock);

stockRouter.put("/update",checkAuth,checkRole(["Order manager"]),updateStock);

stockRouter.delete("/delete/:id",checkAuth , checkRole(["Order manager"]) , deleteStock);

stockRouter.get("/getAllStock",checkAuth,checkRole(["Order manager"]),getAllStocks);

module.exports = stockRouter;
