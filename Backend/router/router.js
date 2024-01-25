import express from "express";
import { loginCheck, postRegister, authorizeToken } from "../controllers/userController.js";

const router = express.Router();

// sign up path
router.post("/signup", postRegister);
//log in path
router.post("/login", loginCheck);
router.get("/token", authorizeToken)
export default router;
