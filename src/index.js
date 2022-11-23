const express = require("express");

const app = express();

/** V1 */
app.use("/api/v1", (req, res) => {
    res.send("OK");
})

app.use("/*", (req, res) => {
    res.send("Not Found");  
})

app.listen(3000);