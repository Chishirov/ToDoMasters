import express from "express";
import { authorizeToken } from "../controllers/autorizeToken.js";
import { signupController } from "../controllers/signupController.js";
import { validateUser } from "../middlewares/validateUser.js";
import { limiter } from "../middlewares/limiter.js";
import { loginController } from "../controllers/loginController.js";
import { authorizeUser } from "../controllers/authorizeUser.js";
import { createTodo } from "../controllers/createTodo.js";
import { getAllTodos } from "../controllers/getAllTodos.js";
import { updateTodo } from "../controllers/updateTodo.js";
import { deleteTodo } from "../controllers/deleteTodo.js";

const router = express.Router();

// sign up
router.post("/signup", validateUser, signupController);
//log in
router.post("/login", limiter, loginController);

router.get("/token", authorizeToken);

router.post("/todos", authorizeUser, createTodo);

router.get("/todos", authorizeUser, getAllTodos);

router.put("/todos/:todoId", authorizeUser, updateTodo);

router.delete("/todos/:todoId", authorizeUser, deleteTodo);

export default router;
