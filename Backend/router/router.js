import express from "express";
import {
  loginCheck,
  postRegister,
  authorizeToken,
} from "../controllers/userController.js";
import { limiter, validateSchema, validatorUser } from "../middlewares/loginValidetor.js";

const router = express.Router();

// sign up path
router.post("/signup", validatorUser, validateSchema, postRegister);
//log in path
router.post("/login", limiter, loginCheck);
router.get("/token", authorizeToken);

export default router;
