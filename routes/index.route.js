const express = require('express');
const subjectRoute = require('./subject.route');
const roleRoute = require('./role.route');
const userRoute = require('./user.route');
const sessionRoute = require("./session.route");
const examRoute = require("./exam.route");
module.exports = (app) => {
  const version = '/api/v1';
  app.use(version + '/subject', subjectRoute);
  app.use(version + '/role', roleRoute);
  app.use(version + '/user', userRoute)
  app.use(version + '/session', sessionRoute)
  app.use(version + '/exam', examRoute)
  
};
