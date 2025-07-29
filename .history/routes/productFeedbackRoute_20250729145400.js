const express = require("express");
const productFeedbackRouter = express.Router();
const checkAuth = require("../middlewares/tokenmiddleware");
const checkRole = require("../middlewares/checkRolemiddleware");

productFeedbackRouter.use(checkAuth , checkRole(["Product manager"]));

product

module.exports = productFeedbackRouter;