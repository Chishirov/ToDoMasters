import express from "express";
// import { authorizeToken } from "../controllers/autorizeToken.js";
import { postSignupController } from "../controllers/signupController.js";

import { limiter } from "../middlewares/limiter.js";
import {
  postLoginController,
  postLogoutController,
} from "../controllers/loginController.js";
import {
  getAllUsers,
  getUserById,
  getUserInfo,
} from "../controllers/userController.js";
import authintcatUser from "../middlewares/authintcatUser.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  postDelete,
  postItem,
  postUpdate,
  updateItemCategory,
} from "../controllers/itemsController.js";
const router = express.Router();

// sign up
router.post("/api/signup", validateUser,validateSchema, postSignupController);
//log in
router.post("/api/login", limiter, postLoginController);
router.post("/api/logout", postLogoutController);

router.get("/api/userinfo", authintcatUser, getUserInfo);
router.get("/api/users", getAllUsers);
router.get("/api/user/:id", getUserById);

//////
router.post("/api/postitem/:id", postItem);
router.put("/api/updateItemCategory/:userId/:itemId", updateItemCategory);
router.put("/api/users/:id/items/:itemId", postUpdate);
router.delete("/api/users/:id/items/:itemId", postDelete);

export default router;
