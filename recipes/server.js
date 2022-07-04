const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')


const api = require('./server/routes/api');
const apiImport = require('./server/routes/api-import');


app.use(express.static(path.join(__dirname, 'dist/recipes')));


express.json();
express.urlencoded({ extended: true });

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });


app.use('/api', api);
app.use('/api-import', apiImport);

// Catch all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/recipes/index.html'))
});

const port = process.env.SERVER_PORT || 4200;

const ip = process.env.SERVER_IP || 'localhost';

app.listen(port, ip, (req, res) => {
    console.log(`Running on ip: ${ip} port: ${port}`);
});