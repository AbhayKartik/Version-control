const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/allusers", userController.getAllUsers);
userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.get("/userprofile/:id", userController.getUserProfile);
userRouter.put("/updateuser/:id", userController.updateUserProfile);
userRouter.delete("/deleteuser/:id", userController.deleteUserProfile);

module.exports = userRouter;
