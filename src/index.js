const https = require("https");
const app = require('./app');
const { logger } = require('./utils/logger');
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const HOST_NAME = process.env.HOST_NAME;

const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
  };
// https.createServer(options, app).listen(PORT, () => {
//     logger.info(`Running on PORT ${PORT}`);
// });
app.listen(PORT, () => {
    logger.info(`Running on PORT ${PORT}`);
});
