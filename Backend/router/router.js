import express from "express";
// import { authorizeToken } from "../controllers/autorizeToken.js";
import { postSignupController } from "../controllers/signupController.js";

import { limiter } from "../middlewares/limiter.js";
import {
  postLoginController,
  postLogoutController,
} from "../controllers/loginController.js";
<<<<<<< HEAD
import { getAllUsers, getUserInfo } from "../controllers/userController.js";
=======
import { getUserById, getUserInfo } from "../controllers/userController.js";
>>>>>>> origin/main
import authintcatUser from "../middlewares/authintcatUser.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateSchema } from "../middlewares/validateSchema.js";
const router = express.Router();

// sign up
router.post("/signup", validateUser,  postSignupController);
//log in
router.post("/login", limiter, postLoginController);
router.post("/logout", postLogoutController);

router.get("/userinfo", authintcatUser, getUserInfo);
<<<<<<< HEAD
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserInfo);
=======
outer.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
>>>>>>> origin/main

// router.post("/todos", authorizeUser, createTodo);

// router.get("/todos", authorizeUser, getAllTodos);

// router.put("/todos/:todoId", authorizeUser, updateTodo);

// router.delete("/todos/:todoId", authorizeUser, deleteTodo);

export default router;
