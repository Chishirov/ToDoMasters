import express from "express";
// import { authorizeToken } from "../controllers/autorizeToken.js";
import { postSignupController } from "../controllers/signupController.js";

import { limiter } from "../middlewares/limiter.js";
import {
  postLoginController,
  postLogoutController,
} from "../controllers/loginController.js";
import { getUserById, getUserInfo } from "../controllers/userController.js";
import authintcatUser from "../middlewares/authintcatUser.js";
import { validateUser } from "../middlewares/validateUser.js";
const router = express.Router();

// sign up
router.post("/signup", validateUser, postSignupController);
//log in
router.post("/login", limiter, postLoginController);
router.post("/logout", postLogoutController);

router.get("/userinfo", authintcatUser, getUserInfo);
outer.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);

// router.post("/todos", authorizeUser, createTodo);

// router.get("/todos", authorizeUser, getAllTodos);

// router.put("/todos/:todoId", authorizeUser, updateTodo);

// router.delete("/todos/:todoId", authorizeUser, deleteTodo);

export default router;
