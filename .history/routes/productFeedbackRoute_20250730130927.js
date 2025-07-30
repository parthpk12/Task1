const express = require("express");
const productFeedbackRouter = express.Router();
const checkAuth = require("../middlewares/tokenmiddleware");
const checkRole = require("../middlewares/checkRolemiddleware");
const { GetAllFeedbacks, getAllFeedBacksByProductId, getAllFeedBacksByUserId, deleteFeedbackByUserIdProductId, deleteFeedbackByUserId } = require("../controllers/productFeedbackController");

productFeedbackRouter.use(checkAuth , checkRole(["Product manager"]));

productFeedbackRouter.get("/getAll",GetAllFeedbacks);

productFeedbackRouter.get("/getAll/:pid",getAllFeedBacksByProductId);

productFeedbackRouter.get("/getAllByUserId/:uid",getAllFeedBacksByUserId);

productFeedbackRouter.delete("/deleteByUP/:uid/:pid" , deleteFeedbackByUserIdProductId );

productFeedbackRouter.delete("/deleteAllFeedbackByUserId/:uid",deleteFeedbackByUserId);

productFeedbackRouter.delete("/deleteAllFeedbackByProductId/:pid",deleteFeedbackByProductId)


module.exports = productFeedbackRouter;