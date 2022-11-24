/** Define api v1 router */
const v1BoardRouter = require("./board.router");
const v1BoardItemRouter = require("./board-item.router");
/** End define api v1 router */

const v1ApiRouter = (app) => {
    app.use("/api/v1/board", v1BoardRouter);

    app.use("/api/v1/board-item", v1BoardItemRouter);
};

module.exports = v1ApiRouter;