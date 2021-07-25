const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

//Config Environment variables
require("dotenv").config();

//Config Database
require("./configs/db/db");

//General Config
require("./middlewares/config.mdw")(app);

require("./middlewares/passport.mdw");

app.use("/", require("./routers/index"));

app.listen(port, () => console.log("Link: http://localhost:" + port));
