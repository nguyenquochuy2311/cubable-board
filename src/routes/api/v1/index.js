const v1BoardRouter = require("./board.router");

const v1ApiRouter = (app) => {
    app.use("/api/v1/board", v1BoardRouter);
};

module.exports = v1ApiRouter;