const express = require("express");

const {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue
} = require("../controllers/issueController");

const {
    createComment,
    getComments,
    updateComment,
    deleteComment
} = require("../controllers/commentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createIssue);

router.get("/", protect, getIssues);

router.get("/:id", protect, getIssueById);

router.put("/:id", protect, updateIssue);

router.delete("/:id", protect, deleteIssue);

// Issue comments
router.post("/:issueId/comments", protect, createComment);

router.get("/:issueId/comments", protect, getComments);

router.put(
    "/:issueId/comments/:commentId",
    protect,
    updateComment
);

router.delete(
    "/:issueId/comments/:commentId",
    protect,
    deleteComment
);

module.exports = router;