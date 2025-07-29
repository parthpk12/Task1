const express = require("express");
const productFeedbackRouter = express.Router();
const checkAuth = require(".")

productFeedbackRouter.use(checkAuth);


module.exports = productFeedbackRouter;