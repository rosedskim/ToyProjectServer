//=========================================================================================================
// Module

// Express
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');

//=========================================================================================================
// My Module

const config = require('./config/config');
const database = require('./database/database');
const route_loader = require('./routes/route_loader');
//=========================================================================================================
// Setting

const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Port Number
app.set('port', process.env.PORT || config.server_port);
//=========================================================================================================
// Middleware

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

// Static Path
app.use(express.static(path.join(__dirname, 'public')));
//=========================================================================================================
// Server

const router = express.Router();
route_loader.init(app, router);

app.listen(app.get('port'), () => {
  console.log(`서버 시작 : ${app.get('port')}`);
  database.init(app, config)
});

process.on('uncaughtException', err => {
	console.log('uncaughtException 발생함 : ' + err);
	console.log('서버 프로세스 종료하지 않고 유지함.');
	
	console.log(err.stack);
});

process.on('SIGTERM', () => {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', () => {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database.db) {
		database.db.close();
	}
});

//=========================================================================================================
// Error Handling

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//=========================================================================================================

module.exports = app;
