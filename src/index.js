const express = require("express");
const app = express();
const httpError = require("http-errors");
const v1ApiRouter = require("./routes/api/v1");


/** V1 */
v1ApiRouter(app);

app.use((req, res, next)  => {
    next(httpError.NotFound("API Not Found"));
})

app.use((err, req, res, next) => {
    res.status(err.status || 400).send({
        message: err.message || "Something went wrong"
    })
})

app.listen(3000, () => {
    console.log("Running...");
});