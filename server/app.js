require("dotenv").config();

const express = require("express");
const app = express();

require("./configs/mongoose.config");
require("./configs/debugger.config");
require("./configs/middlewares.config")(app);
require("./configs/view-engine.config")(app);
require("./configs/locals.config")(app);
require("./configs/session.config")(app);

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/center", require("./routes/center.routes"));
app.use("/api/dog", require("./routes/dog.routes"));
app.use("/api/files", require("./routes/files.routes"));
app.use("/api/calendar", require("./routes/calendar.routes"));
app.use("/api/comment", require("./routes/comment.routes"));

app.use((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
