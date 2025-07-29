const express = require("express");
const productFeedbackRouter = express.Router();
const {authCheck}

productFeedbackRouter.use(authCheck);


module.exports = productFeedbackRouter;