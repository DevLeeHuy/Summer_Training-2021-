const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();
const db = require("./configs/db/db");

require("./middlewares/config.mdw")(app);

app.use("/", require("./routers/index"));

app.listen(port, () => console.log("Link: http://localhost:" + port));
