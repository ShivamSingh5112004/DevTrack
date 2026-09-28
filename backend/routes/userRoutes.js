const express = require("express");

const {
    createUser,
    getUsers,
    getUserById,
    loginUser,
    updateUserRole,
    deleteUser
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id/role", protect, adminOnly, updateUserRole);

router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;