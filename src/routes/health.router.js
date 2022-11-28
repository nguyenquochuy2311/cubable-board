module.exports = (app) => {
    app.use("/api/health", (req, res) => {
        res.send("OK");
    });
};