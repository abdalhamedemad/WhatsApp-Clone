const express = require("express");
const { body } = require("express-validator/check");

//  controllers is a folder where we will store all the controllers used in the routes
const feedController = require("../controllers/feed");
//  isAuth is a middleware used to check if the user is authenticated or not
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/users", feedController.getUsers);
router.post("/get-public-key", feedController.getPublicKey);
router.post("/conversation-data", feedController.getConversationData);
router.post("/send-message", feedController.createMessage);

router.post("/record", feedController.record);
module.exports = router;
