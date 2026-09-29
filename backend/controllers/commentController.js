const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Issue = require("../models/Issue");
const Project = require("../models/Project");

// Check whether a user belongs to the project
const isProjectMember = (project, userId) => {
    const isOwner = project.owner.toString() === userId;

    const isMember = project.members.some(
        (member) => member.toString() === userId
    );

    return isOwner || isMember;
};

// Create a comment
const createComment = async (req, res, next) => {
    try {
        const { issueId } = req.params;
        const { content } = req.body;

        if (!mongoose.isValidObjectId(issueId)) {
            return res.status(400).json({
                message: "Invalid issue ID"
            });
        }

        if (!content || content.trim() === "") {
            return res.status(400).json({
                message: "Comment content is required"
            });
        }

        const issue = await Issue.findById(issueId);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        const project = await Project.findById(issue.project);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (!isProjectMember(project, req.user.userId)) {
            return res.status(403).json({
                message: "You are not a member of this project"
            });
        }

        const comment = await Comment.create({
            issue: issueId,
            author: req.user.userId,
            content
        });

        await comment.populate("author", "name email");

        res.status(201).json({
            message: "Comment created successfully",
            comment
        });
    } catch (error) {
        next(error);
    }
};

// Get comments for an issue
const getComments = async (req, res, next) => {
    try {
        const { issueId } = req.params;

        if (!mongoose.isValidObjectId(issueId)) {
            return res.status(400).json({
                message: "Invalid issue ID"
            });
        }

        const issue = await Issue.findById(issueId);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        const project = await Project.findById(issue.project);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (!isProjectMember(project, req.user.userId)) {
            return res.status(403).json({
                message: "You are not a member of this project"
            });
        }

        const comments = await Comment.find({
            issue: issueId
        })
            .sort({ createdAt: 1 })
            .populate("author", "name email");

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

// Update a comment
const updateComment = async (req, res, next) => {
    try {
        const { issueId, commentId } = req.params;
        const { content } = req.body;

        if (!mongoose.isValidObjectId(issueId)) {
            return res.status(400).json({
                message: "Invalid issue ID"
            });
        }

        if (!mongoose.isValidObjectId(commentId)) {
            return res.status(400).json({
                message: "Invalid comment ID"
            });
        }

        if (!content || content.trim() === "") {
            return res.status(400).json({
                message: "Comment content is required"
            });
        }

        const comment = await Comment.findOne({
            _id: commentId,
            issue: issueId
        });

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the comment author can update this comment"
            });
        }

        comment.content = content;

        await comment.save();
        await comment.populate("author", "name email");

        res.status(200).json({
            message: "Comment updated successfully",
            comment
        });
    } catch (error) {
        next(error);
    }
};

// Delete a comment
const deleteComment = async (req, res, next) => {
    try {
        const { issueId, commentId } = req.params;

        if (!mongoose.isValidObjectId(issueId)) {
            return res.status(400).json({
                message: "Invalid issue ID"
            });
        }

        if (!mongoose.isValidObjectId(commentId)) {
            return res.status(400).json({
                message: "Invalid comment ID"
            });
        }

        const comment = await Comment.findOne({
            _id: commentId,
            issue: issueId
        });

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the comment author can delete this comment"
            });
        }

        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment
};