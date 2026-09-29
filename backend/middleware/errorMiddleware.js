const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format"
        });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed"
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            message: "Resource already exists"
        });
    }

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: statusCode === 500
            ? "Internal Server Error"
            : err.message || "Internal Server Error"
    });
};

module.exports = errorHandler;