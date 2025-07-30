const express = require("express");
const productFeedbackRouter = express.Router();
const checkAuth = require("../middlewares/tokenmiddleware");
const checkRole = require("../middlewares/checkRolemiddleware");
const { GetAllFeedbacks, getAllFeedBacksByProductId } = require("../controllers/productFeedbackController");

productFeedbackRouter.use(checkAuth , checkRole(["Product manager"]));

productFeedbackRouter.get("/getAll",GetAllFeedbacks);

productFeedbackRouter.get("/getAll/:pid",getAllFeedBacksByProductId);

// make the getAll/:userId
// delete by productId && userId
// deleteAll of the same user
// deleteAl


module.exports = productFeedbackRouter;