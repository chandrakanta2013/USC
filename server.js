process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log("NODE_ENV :",process.env.NODE_ENV);
var exp = require('express');
var config = require('./configs/configs');
var express = require('./configs/express');
//var mongoose = require('./configs/mongoose');

if (global.permission) {

} else {
	global.permission = [];
}

//var db = mongoose();
var app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json()); 

app.use(exp.static(__dirname + '/usc'));

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

// app.get('/usc/home.html', function(req, res) {
// 	res.sendfile('./home.html');
// });

// app.get('/admin', function(req, res) {
// 	res.sendfile('./../admin/index.html');
// });



app.listen(config.serverPort);
console.log('Server running at http://localhost:' + config.serverPort + '/');
