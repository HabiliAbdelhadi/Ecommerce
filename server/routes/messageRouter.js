const { Router } = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.post(
  "/messages",

  messageController.createMsg
);
messageRouter.get("/messages", messageController.getAllMsg);
messageRouter.get("/messages/:id", messageController.getMsg);
messageRouter.delete("/messages/:id", messageController.deleteMsg);
module.exports = messageRouter;
