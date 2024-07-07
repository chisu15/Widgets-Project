const express = require('express');
const subjectRoute = require('./subject.route');
const roleRoute = require('./role.route');
const userRoute = require('./user.route');

module.exports = (app) => {
  const version = '/api/v1';
  app.use(version + '/subject', subjectRoute);
  app.use(version + '/role', roleRoute);
  app.use(version + '/user', userRoute)
};
