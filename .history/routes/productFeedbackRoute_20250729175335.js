const express = require("express");
const productFeedbackRouter = express.Router();
const checkAuth = require("../middlewares/tokenmiddleware");
const checkRole = require("../middlewares/checkRolemiddleware");
const { GetAllFeedbacks } = require("../controllers/productFeedbackController");

productFeedbackRouter.use(checkAuth , checkRole(["Product manager"]));

productFeedbackRouter.get("/getAll",GetAllFeedbacks);

module.exports = productFeedbackRouter;