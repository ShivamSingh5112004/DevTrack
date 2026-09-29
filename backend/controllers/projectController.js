const mongoose = require("mongoose");
const Project = require("../models/Project");
const User = require("../models/User");
const Issue = require("../models/Issue");

// Validate and normalize project member IDs
const validateProjectMembers = async (members, ownerId) => {
    if (members === undefined) {
        return undefined;
    }

    if (!Array.isArray(members)) {
        const error = new Error("Members must be an array");
        error.statusCode = 400;
        throw error;
    }

    const uniqueMembers = [...new Set(members)];

    const invalidMemberId = uniqueMembers.find(
        (memberId) => !mongoose.isValidObjectId(memberId)
    );

    if (invalidMemberId) {
        const error = new Error("One or more member IDs are invalid");
        error.statusCode = 400;
        throw error;
    }

    if (uniqueMembers.includes(ownerId.toString())) {
        const error = new Error(
            "Project owner cannot be added as a project member"
        );
        error.statusCode = 400;
        throw error;
    }

    const existingUsers = await User.find({
        _id: { $in: uniqueMembers }
    }).select("_id");

    const existingUserIds = new Set(
        existingUsers.map((user) => user._id.toString())
    );

    const missingUserId = uniqueMembers.find(
        (memberId) => !existingUserIds.has(memberId.toString())
    );

    if (missingUserId) {
        const error = new Error("One or more users do not exist");
        error.statusCode = 404;
        throw error;
    }

    return uniqueMembers;
};

// Create a new project
const createProject = async (req, res, next) => {
    try {
        const { name, description, members, status } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Project name is required"
            });
        }

        const validatedMembers = await validateProjectMembers(
            members,
            req.user.userId
        );

        const project = await Project.create({
            name,
            description,
            owner: req.user.userId,
            members: validatedMembers,
            status
        });

        res.status(201).json({
            message: "Project created successfully",
            project
        });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                message: error.message
            });
        }

        next(error);
    }
};

// Get all projects
const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find()
            .populate("owner", "name email")
            .populate("members", "name email");

        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
};

// Get a single project
const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }

        const project = await Project.findById(id)
            .populate("owner", "name email")
            .populate("members", "name email");

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

// Update a project
const updateProject = async (req, res, next) => {
    try {
        const { name, description, members, status } = req.body;
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the project owner can update this project"
            });
        }

        const validatedMembers = await validateProjectMembers(
            members,
            project.owner
        );

        if (name !== undefined) {
            project.name = name;
        }

        if (description !== undefined) {
            project.description = description;
        }

        if (members !== undefined) {
            project.members = validatedMembers;
        }

        if (status !== undefined) {
            project.status = status;
        }

        await project.save();

        res.status(200).json({
            message: "Project updated successfully",
            project
        });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                message: error.message
            });
        }

        next(error);
    }
};

// Delete a project
const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the project owner can delete this project"
            });
        }

        // Delete all issues belonging to this project
        await Issue.deleteMany({
            project: id
        });

        // Delete the project itself
        await Project.findByIdAndDelete(id);

        res.status(200).json({
            message: "Project and its issues deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

// Add a member to a project
const addProjectMember = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the project owner can add members"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (project.owner.toString() === userId) {
            return res.status(400).json({
                message: "Project owner is already the owner of this project"
            });
        }

        if (project.members.some((member) => member.toString() === userId)) {
            return res.status(409).json({
                message: "User is already a project member"
            });
        }

        project.members.push(userId);

        await project.save();

        await project.populate("owner", "name email");
        await project.populate("members", "name email");

        res.status(200).json({
            message: "Project member added successfully",
            project
        });
    } catch (error) {
        next(error);
    }
};

// Remove a member from a project
const removeProjectMember = async (req, res, next) => {
    try {
        const { userId, id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the project owner can remove members"
            });
        }

        if (project.owner.toString() === userId) {
            return res.status(400).json({
                message: "Project owner cannot be removed from the project"
            });
        }

        const isMember = project.members.some(
            (member) => member.toString() === userId
        );

        if (!isMember) {
            return res.status(404).json({
                message: "User is not a member of this project"
            });
        }

        project.members = project.members.filter(
            (member) => member.toString() !== userId
        );

        await project.save();

        await project.populate("owner", "name email");
        await project.populate("members", "name email");

        res.status(200).json({
            message: "Project member removed successfully",
            project
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    addProjectMember,
    removeProjectMember
};