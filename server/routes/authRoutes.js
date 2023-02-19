import express from "express";
import {
  registerController,
  loginController,
  getFollowersController,
  getFollowingController,
  followController,
} from "../controllers/authControllers.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserController);
router.get("/:id/followers", verifyToken, getFollowersController);
router.get("/:id/following", verifyToken, getFollowingController);

router.patch("/follow/:id/:targetId/", verifyToken, followController);
router.post("/login", loginController);

export default router;
