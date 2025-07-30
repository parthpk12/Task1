const express = require("express");
const productFeedbackRouter = express.Router();
const checkAuth = require("../middlewares/tokenmiddleware");
const checkRole = require("../middlewares/checkRolemiddleware");
const { GetAllFeedbacks, getAllFeedBacksByProductId, getAllFeedBacksByUserId } = require("../controllers/productFeedbackController");

productFeedbackRouter.use(checkAuth , checkRole(["Product manager"]));

productFeedbackRouter.get("/getAll",GetAllFeedbacks);

productFeedbackRouter.get("/getAll/:pid",getAllFeedBacksByProductId);

productFeedbackRouter.get("/getAllByUserId/:",getAllFeedBacksByUserId);

// make the getAll/:userId
// delete by productId && userId
// deleteAll of the same user
// deleteAll of the same productId
// update the feedback where product and userid

module.exports = productFeedbackRouter;