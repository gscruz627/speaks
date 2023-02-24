import express from "express";
const router = express.Router();

router.get("/story/:id", getStoryController);
router.get("/stories", verifyToken, getAllStoriesControllers);
router.get("/:userId/stories", verifyToken, getUserStoriesController);
router.get("/story/:id/comments", verifyToken, getStoryCommentsController);
router.get("/topics/:name", verifyToken, getStoriesByTopicController);

router.post("/story/:id/newComment", verifyToken, newCommentController);
router.patch("/story/:id/agree", verifyToken, agreeController);
router.patch("/story/:id/disagree", verifyToken, disagreeController);
router.patch("/story/:id/rate", verifyToken, rateController);
router.patch("/comment/:id/agree", verifyToken, commentAgreeController);
router.patch("/comment/:id/disagree", verifyToken, disagreeCommentController);

router.delete("/story/:id", verifyToken, deleteStoryController);
router.delete("/story/:id/comment", verifyToken, deleteCommentController);
export default router;