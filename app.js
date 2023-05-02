require("dotenv").config();
require("./db");

const express = require("express");

const app = express();
const configMiddleware = require("./config");
const indexRoutes = require("./routes/index.routes");

configMiddleware(app);

app.use("/api", indexRoutes);

require("./error-handling")(app);

module.exports = app;
