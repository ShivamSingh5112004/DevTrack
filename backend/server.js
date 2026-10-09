require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const issueRoutes = require("./routes/issueRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

const swaggerDocument = YAML.load("./docs/openapi.yaml");

const PORT = process.env.PORT || 5000;

// CORS configuration
const configuredOrigins = (
    process.env.CORS_ORIGIN || "http://localhost:5173"
)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const developmentOrigins =
    process.env.NODE_ENV !== "production"
        ? ["http://localhost:5173", "http://localhost:3000"]
        : [];

const allowedOrigins = [
    ...new Set([...configuredOrigins, ...developmentOrigins])
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests without an Origin header.
        // This includes tools such as Postman and cURL.
        if (!origin) {
            return callback(null, true);
        }

        // Allow Swagger UI served by this backend during local development.
        if (
            process.env.NODE_ENV !== "production" &&
            origin === `http://localhost:${PORT}`
        ) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("CORS policy: Origin not allowed"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.send("DevTrack Backend is running!");
});

// Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Handle unknown routes
app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Centralized error handler
app.use(errorHandler);

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`DevTrack server running on port ${PORT}`);
    });
};

startServer();