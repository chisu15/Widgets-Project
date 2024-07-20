const subjectRoute = require('./subject.route');
const roleRoute = require('./role.route');
const userRoute = require('./user.route');
const sessionRoute = require("./session.route");
const examRoute = require("./exam.route");
const questionTypeRoute = require('./questionType.route');
const generalTypeRoute = require('./generalType.route');
const widgetRoute = require('./widget.route');
const questionRoute = require('./question.route');

module.exports = (app) => {
  const version = '/api/v1';
  app.use(version + '/subject', subjectRoute);
  app.use(version + '/role', roleRoute);
  app.use(version + '/user', userRoute);
  app.use(version + '/session', sessionRoute);
  app.use(version + '/exam', examRoute);
  app.use(version + '/widget', widgetRoute);
  app.use(version + '/question-type',questionTypeRoute);
  app.use(version + '/general-type', generalTypeRoute);
  app.use(version + '/question', questionRoute);
};
