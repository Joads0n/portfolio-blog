const bodyParser = require('body-parser');
const userRoutes = require('./user-routes');

module.exports = app => {
  app.use(
    bodyParser.json(),
    userRoutes
  );
};