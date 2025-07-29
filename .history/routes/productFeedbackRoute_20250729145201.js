const express = require("express");
const productFeedbackRouter = express.Router();

productFeedbackRouter.use(authCheck)


module.exports = productFeedbackRouter;