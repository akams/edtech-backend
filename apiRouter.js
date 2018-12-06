var express       = require('express');
var apiRouter     = express.Router();

var usersRouter   = require('./routes/users');
var studentRouter = require('./routes/student');
var teacherRouter = require('./routes/teacher');
var testRouter    = require('./routes/test');

apiRouter.use('/test',testRouter);
apiRouter.use('/users', usersRouter)
apiRouter.use('/student', studentRouter)
apiRouter.use('/teacher', teacherRouter)

module.exports = apiRouter;
