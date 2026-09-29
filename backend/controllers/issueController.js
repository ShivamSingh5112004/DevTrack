const mongoose = require("mongoose");
const Issue = require("../models/Issue");
const Project = require("../models/Project");
const User = require("../models/User");
const Comment = require("../models/Comment");

// Create a new issue
const createIssue = async (req, res, next) => {
    try {
        const {
            title,
            description,
            project,
            assignedTo,
            priority,
            status,
            deadline
        } = req.body;

        if (!title || !project) {
            return res.status(400).json({
                message: "Issue title and project are required"
            });
        }

        // Check whether the project exists
        const projectData = await Project.findById(project);

        if (!projectData) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // Check whether the authenticated user belongs to the project
        const isProjectOwner =
            projectData.owner.toString() === req.user.userId;

        const isProjectMember = projectData.members.some(
            (member) => member.toString() === req.user.userId
        );

        if (!isProjectOwner && !isProjectMember) {
            return res.status(403).json({
                message: "You are not a member of this project"
            });
        }

        // Validate assigned user if provided
        if (assignedTo) {
            const assignedUser = await User.findById(assignedTo);

            if (!assignedUser) {
                return res.status(404).json({
                    message: "Assigned user not found"
                });
            }

            const isAssignedUserProjectOwner =
                projectData.owner.toString() === assignedTo;

            const isAssignedUserProjectMember = projectData.members.some(
                (member) => member.toString() === assignedTo
            );

            if (
                !isAssignedUserProjectOwner &&
                !isAssignedUserProjectMember
            ) {
                return res.status(400).json({
                    message: "Assigned user must be a member of the project"
                });
            }
        }

        const issue = await Issue.create({
            title,
            description,
            project,
            assignedTo,
            createdBy: req.user.userId,
            priority,
            status,
            deadline
        });

        await issue.populate("project", "name");
        await issue.populate("assignedTo", "name email");
        await issue.populate("createdBy", "name email");

        res.status(201).json({
            message: "Issue created successfully",
            issue
        });
    } catch (error) {
        next(error);
    }
};

// Get issues with filters, search, overdue filtering, and pagination
const getIssues = async (req, res, next) => {
    try {
        const {
            project,
            status,
            priority,
            assignedTo,
            search,
            overdue
        } = req.query;

        // Pagination
        const page = req.query.page !== undefined
            ? Number(req.query.page)
            : 1;

        const limit = req.query.limit !== undefined
            ? Number(req.query.limit)
            : 10;

        if (!Number.isInteger(page) || page < 1) {
            return res.status(400).json({
                message: "Page must be a positive integer"
            });
        }

        if (!Number.isInteger(limit) || limit < 1) {
            return res.status(400).json({
                message: "Limit must be a positive integer"
            });
        }

        if (limit > 100) {
            return res.status(400).json({
                message: "Limit cannot exceed 100"
            });
        }

        // Validate overdue filter
        if (
            overdue !== undefined &&
            overdue !== "true" &&
            overdue !== "false"
        ) {
            return res.status(400).json({
                message: "Overdue must be either true or false"
            });
        }

        const filter = {};

        // Validate and apply project filter
        if (project !== undefined) {
            if (!mongoose.isValidObjectId(project)) {
                return res.status(400).json({
                    message: "Invalid project ID"
                });
            }

            filter.project = project;
        }

        // Validate and apply assigned user filter
        if (assignedTo !== undefined) {
            if (!mongoose.isValidObjectId(assignedTo)) {
                return res.status(400).json({
                    message: "Invalid user ID"
                });
            }

            filter.assignedTo = assignedTo;
        }

        // Apply status filter
        if (status !== undefined) {
            filter.status = status;
        }

        // Apply priority filter
        if (priority !== undefined) {
            filter.priority = priority;
        }

        // Apply search to issue title and description
        if (search !== undefined && search.trim() !== "") {
            const escapedSearch = search.trim().replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

            filter.$or = [
                {
                    title: {
                        $regex: escapedSearch,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: escapedSearch,
                        $options: "i"
                    }
                }
            ];
        }

        // Apply overdue filter
        if (overdue === "true") {
            filter.deadline = {
                $lt: new Date()
            };

            filter.status = {
                $nin: ["resolved", "closed"]
            };
        }

        if (overdue === "false") {
            filter.$or = [
                {
                    deadline: {
                        $gte: new Date()
                    }
                },
                {
                    deadline: null
                },
                {
                    deadline: {
                        $exists: false
                    }
                },
                {
                    status: {
                        $in: ["resolved", "closed"]
                    }
                }
            ];
        }

        const skip = (page - 1) * limit;

        const [issues, totalIssues] = await Promise.all([
            Issue.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("project", "name")
                .populate("assignedTo", "name email")
                .populate("createdBy", "name email"),

            Issue.countDocuments(filter)
        ]);

        const totalPages = Math.ceil(totalIssues / limit);

        res.status(200).json({
            issues,
            pagination: {
                currentPage: page,
                limit,
                totalIssues,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get a single issue
const getIssueById = async (req, res, next) => {
    try {
        const issue = await Issue.findById(req.params.id)
            .populate("project", "name")
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        res.status(200).json(issue);
    } catch (error) {
        next(error);
    }
};

// Update an issue
const updateIssue = async (req, res, next) => {
    try {
        const {
            title,
            description,
            project,
            assignedTo,
            priority,
            status,
            deadline
        } = req.body;

        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        if (issue.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the issue creator can update this issue"
            });
        }

        // Determine the project that will be used after the update
        let projectData;

        if (project !== undefined) {
            projectData = await Project.findById(project);

            if (!projectData) {
                return res.status(404).json({
                    message: "Project not found"
                });
            }
        } else {
            projectData = await Project.findById(issue.project);

            if (!projectData) {
                return res.status(404).json({
                    message: "Project not found"
                });
            }
        }

        // Determine the assignee that will be used after the update
        const finalAssignedTo =
            assignedTo !== undefined
                ? assignedTo
                : issue.assignedTo;

        // Validate the assignee against the project that will be used
        if (finalAssignedTo !== null && finalAssignedTo !== undefined) {
            const assignedUser = await User.findById(finalAssignedTo);

            if (!assignedUser) {
                return res.status(404).json({
                    message: "Assigned user not found"
                });
            }

            const isProjectOwner =
                projectData.owner.toString() === finalAssignedTo.toString();

            const isProjectMember = projectData.members.some(
                (member) => member.toString() === finalAssignedTo.toString()
            );

            if (!isProjectOwner && !isProjectMember) {
                return res.status(400).json({
                    message: "Assigned user must be a member of the project"
                });
            }
        }

        if (title !== undefined) {
            issue.title = title;
        }

        if (description !== undefined) {
            issue.description = description;
        }

        if (project !== undefined) {
            issue.project = project;
        }

        if (assignedTo !== undefined) {
            issue.assignedTo = assignedTo;
        }

        if (priority !== undefined) {
            issue.priority = priority;
        }

        if (status !== undefined) {
            issue.status = status;
        }

        if (deadline !== undefined) {
            issue.deadline = deadline;
        }

        await issue.save();

        await issue.populate("project", "name");
        await issue.populate("assignedTo", "name email");
        await issue.populate("createdBy", "name email");

        res.status(200).json({
            message: "Issue updated successfully",
            issue
        });
    } catch (error) {
        next(error);
    }
};

// Delete an issue
const deleteIssue = async (req, res, next) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        if (issue.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the issue creator can delete this issue"
            });
        }

        // Delete comments associated with the issue
        await Comment.deleteMany({
            issue: req.params.id
        });

        await Issue.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Issue and its comments deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue
};