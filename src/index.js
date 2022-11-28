const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const httpError = require("http-errors");

/** Sync db */
const db = require("./models");
const type = { alter: { drop: false } }; // { alter: true } || { force: true } || { alter: { drop: false } } || { alter: { drop: false } }
db.sequelize.sync(type).then(() => {
    console.log("::Sync complete");
}).catch((error) => {
    throw error;
});
/** End sync db */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/** Define router api */
require("./routes/health.router")(app);
require("./routes/api/v1")(app);
/** End define router api */

app.use((req, res, next) => {
    next(httpError.NotFound("API Not Found"));
})

app.use((err, req, res, next) => {
    res.status(err.status || 400).send({
        message: err.message || "Something went wrong"
    })
})

app.listen(process.env.NODE_PORT || 3000, () => {
    console.log("Running...");
});