const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const httpError = require("http-errors");

/** Sync db */
const db = require("./models");
const type = { force: true }; // { alter: true }
db.sequelize.sync({ force: true }).then(() => {
    console.log("::Sync db success")
})
    .catch((error) => {
        throw error;
    });
/**End sync db */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/** Define router api */
require("./routes/health.router")(app);
require("./routes/api/v1")(app);
/**End define router api */

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