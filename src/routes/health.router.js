const HealthCheckRouter = (app) => {
    app.use("/api/health", (req, res) => {
        res.send("OK");
    });
};

module.exports = HealthCheckRouter;