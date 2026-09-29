const User = require("../models/User");
const Project = require("../models/Project");
const Issue = require("../models/Issue");
const jwt = require("jsonwebtoken");

// Create a new user
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.status(201).json({
            message: "User created successfully",
            user: userResponse
        });
    } catch (error) {
        next(error);
    }
};

// Login user
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get all users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("name email role");

        const userResponses = users.map((user) => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }));

        res.status(200).json(userResponses);
    } catch (error) {
        next(error);
    }
};

// Get a single user
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select(
            "name email role"
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        next(error);
    }
};

// Update user role
const updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({
                message: "Role is required"
            });
        }

        if (!["developer", "admin"].includes(role)) {
            return res.status(400).json({
                message: "Role must be either developer or admin"
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (req.user.userId.toString() === user._id.toString()) {
            return res.status(400).json({
                message: "You cannot change your own role"
            });
        }

        user.role = role;

        await user.save();

        res.status(200).json({
            message: "User role updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

// Delete a user
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        if (req.user.userId.toString() === userId) {
            return res.status(400).json({
                message: "You cannot delete your own account"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const ownedProjects = await Project.countDocuments({
            owner: userId
        });

        if (ownedProjects > 0) {
            return res.status(400).json({
                message: "Cannot delete user because they own one or more projects"
            });
        }

        const createdIssues = await Issue.countDocuments({
            createdBy: userId
        });

        if (createdIssues > 0) {
            return res.status(400).json({
                message: "Cannot delete user because they created one or more issues"
            });
        }

        await Project.updateMany(
            {
                members: userId
            },
            {
                $pull: {
                    members: userId
                }
            }
        );

        await Issue.updateMany(
            {
                assignedTo: userId
            },
            {
                $unset: {
                    assignedTo: ""
                }
            }
        );

        await User.findByIdAndDelete(userId);

        res.status(200).json({
            message: "User deleted successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    updateUserRole,
    deleteUser
};