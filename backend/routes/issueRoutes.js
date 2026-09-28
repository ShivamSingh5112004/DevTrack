const express = require("express");

const {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue
} = require("../controllers/issueController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createIssue);

router.get("/", protect, getIssues);

router.get("/:id", protect, getIssueById);

router.put("/:id", protect, updateIssue);

router.delete("/:id", protect, deleteIssue);

module.exports = router;