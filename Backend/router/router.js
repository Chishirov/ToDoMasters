import express from "express";
import {
  loginCheck,
  postRegister,
  authorizeToken,
  postItem,
} from "../controllers/userController.js";
import { limiter } from "../middlewares/loginValidetor.js";

const router = express.Router();

// sign up path
router.post("/signup", postRegister);
//log in path
router.post("/login", limiter, loginCheck);
router.post("/login/postitem/:id", authorizeToken, postItem);
router.get("/token", authorizeToken);

export default router;
