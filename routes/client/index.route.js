const homeRouter = require("./home.route.js");
module.exports = (app) => {
    app.use("/", homeRouter);
}