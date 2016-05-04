var express = require('express'),
    employee = require('./employees'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/employees.json', employee.getAllEmployees);
// app.get('/employees/:id', employee.findById);
// app.post('/employees', employee.addEmployee);
// app.put('/employees/:id', employee.updateEmployee);
app.delete('/employees/:id', employee.deleteEmployee);
app.post('/createEmployees', employee.populateDB);

app.listen(3000);
console.log('Listening on port 3000...');