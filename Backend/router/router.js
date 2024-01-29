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
router
  .post("/signup", validatorUser, validateSchema, postRegister) // sign up path
  .post(
    "/login",
    limiter,
    authenticateUser,
    generateToken,
    setCookie,
    loginCheck
  )
  .post("/login/postitem/:id", authorizeToken, postItem)
  .get("/token", authorizeToken)
  .post("/logout", postLogoutController) // log out path from cookie and token
  .put("/update-password", updatePassword);

export default router;
