import express from "express";
// import { authorizeToken } from "../controllers/autorizeToken.js";
import { postSignupController } from "../controllers/signupController.js";

import { limiter } from "../middlewares/limiter.js";
import {
  postLoginController,
  postLogoutController,
} from "../controllers/loginController.js";
import { getAllUsers, getUserInfo } from "../controllers/userController.js";
import authintcatUser from "../middlewares/authintcatUser.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateSchema } from "../middlewares/validateSchema.js";
const router = express.Router();

// sign up
router.post("/api/signup", validateUser, postSignupController);
//log in
router.post("/api/login", limiter, postLoginController);
router.post("/api/logout", postLogoutController);

router.get("/api/userinfo", authintcatUser, getUserInfo);
router.get("/api/users", getAllUsers);
router.get("/api/users/:userId", getUserInfo);

// router.post("/todos", authorizeUser, createTodo);

// router.get("/todos", authorizeUser, getAllTodos);

// router.put("/todos/:todoId", authorizeUser, updateTodo);

// router.delete("/todos/:todoId", authorizeUser, deleteTodo);

export default router;
