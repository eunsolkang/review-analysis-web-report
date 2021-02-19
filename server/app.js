const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function(req, res){
	res.send('Sever alive');
});

app.use('/api', require('./api/router'));

module.exports = app;

