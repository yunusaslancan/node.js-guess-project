var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'users'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
	var email = request.body.email;
	console.log(email);
	var password = request.body.password;
	var role = request.body.role;
	if (email && password ) {
		connection.query('SELECT * FROM users WHERE email = ? AND password = ? AND role = ?', [email, password,role], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;
				response.redirect('/Tahmin');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.redirect("www.google.com");
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/Tahmin', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.email + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);