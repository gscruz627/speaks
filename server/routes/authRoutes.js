import express from "express";
import {
  registerController,
  getUserController,
  loginController,
  getFollowersController,
  getFollowingController,
  followController,
  changePasswordController,
  userDeleteController
} from "../controllers/authControllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserController);
router.get("/:id/followers", verifyToken, getFollowersController);
router.get("/:id/following", verifyToken, getFollowingController);

router.patch("/follow/:id/:targetId/", verifyToken, followController);
router.post("/login", loginController);

router.patch("/changePassword", verifyToken, changePasswordController);
router.delete("/userDelete", verifyToken, userDeleteController);

export default router;
