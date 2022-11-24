/** Define api v1 router */
const v1BoardRouter = require("./board.router");
const v1BoardItemRouter = require("./board-item.router");
const v1FieldRouter = require("./field.router");
/** End define api v1 router */

const v1ApiRouter = (app) => {
    app.use("/api/v1/board", v1BoardRouter);

    app.use("/api/v1/board-item", v1BoardItemRouter);

    app.use("/api/v1/field", v1FieldRouter);
};

module.exports = v1ApiRouter;