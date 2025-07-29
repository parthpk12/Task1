const express = require("express");
const productFeedbackRouter = express.Router();
const checkAuth = require("../middlewares/")

productFeedbackRouter.use(checkAuth);


module.exports = productFeedbackRouter;