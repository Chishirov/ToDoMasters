import express from "express";
import { getUserInfoController, loginCheck, postLogoutController, postRegister, updatePassword} from "../controllers/userController.js";
import { limiter, validateSchema, validatorUser } from "../middlewares/loginValidetor.js";
import { authenticateUser, generateToken, setCookie, authorizeToken} from "../middlewares/authMiddleware.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router
    .post("/signup",validatorUser,validateSchema, postRegister) // sign up path
    .post("/login",limiter, authenticateUser, generateToken, setCookie, loginCheck)
    .get("/token", authorizeToken)
    .post("/logout", postLogoutController) // log out path from cookie and token 
    .put("/update-password", updatePassword)
    // .put("/change-password", isAuth, updatePassword)
    .get("/userinfo", isAuth, getUserInfoController)


export default router;
