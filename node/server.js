var express = require('express'),
    employee = require('./employees'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/employees', employee.findAll);
// app.get('/employees/:id', employee.findById);
// app.post('/employees', employee.addEmployee);
// app.put('/employees/:id', employee.updateEmployee);
// app.delete('/employees/:id', employee.deleteEmployee);

app.listen(3000);
console.log('Listening on port 3000...');