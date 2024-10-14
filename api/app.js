const express = require("express");
const app = express();

// Bootstrap Routes
const routes = require("./src/routes");
routes(app);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
