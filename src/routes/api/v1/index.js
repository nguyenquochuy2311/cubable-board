/** Define api v1 router */
const v1BoardRouter = require("./board.router");
const v1BoardItemRouter = require("./board-item.router");
const v1BoardItemFieldRouter = require("./board-item-field.router");
/** End define api v1 router */

const v1Prefix = "/api/v1";

module.exports = (app) => {
    app.use(`${v1Prefix}/board`, v1BoardRouter);

    app.use(`${v1Prefix}/board-item`, v1BoardItemRouter);

    app.use(`${v1Prefix}/board-item-field`, v1BoardItemFieldRouter);
};