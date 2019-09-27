const app = require('express')();
const Socket = require('./utils/socket-helper');
const cors = require('cors');
const DB = require('./utils/db');

DB.users = [];
const server = app.listen(8000);
app.use(cors());
app.use('/user-list', (req, res, next) => {
   res.json(DB.users);
   next();
});
const io = new Socket(server);
