const express = require('express');
const subjectRoute = require('./subject.route');


module.exports = (app) => {
  const version = '/api/v1';
  app.use(version + '/subject', subjectRoute);
};
