import express from "express";
import {
  loginCheck,
  postRegister,
  authorizeToken,
} from "../controllers/userController.js";
import { limiter } from "../middlewares/loginValidetor.js";

const router = express.Router();

// sign up path
router.post("/signup", postRegister);
//log in path
router.post("/login", limiter, loginCheck);
router.get("/token", authorizeToken);

export default router;
