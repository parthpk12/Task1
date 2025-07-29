const express = require("express");
const productFeedbackRouter = express.Router();
const checkAuth

productFeedbackRouter.use(checkAuth);


module.exports = productFeedbackRouter;