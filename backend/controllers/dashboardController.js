const Project = require("../models/Project");
const Issue = require("../models/Issue");

// Get dashboard data for the authenticated user
const getDashboard = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const now = new Date();

        // Get projects owned by or assigned to the authenticated user
        const projects = await Project.find({
            $or: [
                { owner: userId },
                { members: userId }
            ]
        }).select("name owner members status");

        const projectIds = projects.map((project) => project._id);

        // Get issues belonging to the user's projects
        const issues = await Issue.find({
            project: { $in: projectIds }
        }).select(
            "title project assignedTo createdBy priority status deadline"
        );

        // Issue statistics
        const openIssues = issues.filter(
            (issue) => issue.status === "open"
        ).length;

        const inProgressIssues = issues.filter(
            (issue) => issue.status === "in-progress"
        ).length;

        const resolvedIssues = issues.filter(
            (issue) => issue.status === "resolved"
        ).length;

        const closedIssues = issues.filter(
            (issue) => issue.status === "closed"
        ).length;

        const overdueIssues = issues.filter(
            (issue) =>
                issue.deadline &&
                new Date(issue.deadline) < now &&
                !["resolved", "closed"].includes(issue.status)
        ).length;

        // Active projects
        const activeProjects = projects.filter(
            (project) => project.status === "active"
        ).length;

        // Project progress
        const projectProgress = projects.map((project) => {
            const projectIssues = issues.filter(
                (issue) =>
                    issue.project.toString() === project._id.toString()
            );

            const totalIssues = projectIssues.length;

            const completedIssues = projectIssues.filter(
                (issue) =>
                    issue.status === "resolved" ||
                    issue.status === "closed"
            ).length;

            const progress =
                totalIssues === 0
                    ? 0
                    : Math.round((completedIssues / totalIssues) * 100);

            return {
                id: project._id,
                name: project.name,
                status: project.status,
                totalIssues,
                completedIssues,
                progress
            };
        });

        // Issues assigned to the authenticated user
        const myWork = issues
            .filter(
                (issue) =>
                    issue.assignedTo &&
                    issue.assignedTo.toString() === userId
            )
            .map((issue) => ({
                id: issue._id,
                title: issue.title,
                project: issue.project,
                priority: issue.priority,
                status: issue.status,
                deadline: issue.deadline
            }));

        res.status(200).json({
            issueStats: {
                open: openIssues,
                inProgress: inProgressIssues,
                resolved: resolvedIssues,
                closed: closedIssues,
                overdue: overdueIssues
            },

            projectStats: {
                active: activeProjects,
                total: projects.length
            },

            projectProgress,

            myWork
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboard
};