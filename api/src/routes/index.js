module.exports = function (app) {
  app.use("/subdivision", require("./SubdivisionRoutes"));
};
