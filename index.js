const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const db = require('./config/db');
const path = require("path");

db.connect();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('/uploads/'));
// ROUTE
const route = require('./routes/index.route');
route(app);

app.listen(port, () => {
  console.log(`Server started on port`, port);
});
