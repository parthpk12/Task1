const express = require("express");
const checkAuth = require("../middlewares/tokenmiddleware");
const checkRole = require("../middlewares/checkRolemiddleware");
const stockRouter = express.Router();


stockRouter.post("/create",checkAuth,checkRole["Order manager"],createStock);

module.exports = stockRouter;
