// require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(express.json());
cors = require('cors');

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
});
 
// connect to database
mc.connect();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, PUT, GET, OPTIONS");
    // res.header("Access-Control-Allow-Headers" , "Authorization");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
 
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
 
// Retrieve all todos 
app.get('/todos', function (req, res) {
    mc.query('SELECT * FROM tasks', function (error, results, fields) {
        if (error) throw error;
        // return res.send({ data: results });
        return res.send(results);
    });
});
 
// Search for todos with ‘bug’ in their name
app.get('/todos/search/:keyword', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT * FROM tasks WHERE task LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Todos search list.' });
    });
});
 
// Retrieve todo with id 
app.get('/todo/:id', function (req, res) {
 
    let task_id = req.params.id;
  
    mc.query('SELECT * FROM tasks where id=?', task_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Todos list.' });
    });
 
});
 
// Add a new todo  
app.post('/todo', function (req, res) {
 
    let task = req.body.task;
 
    if (!task) {
        return res.status(400).send({ error: true, message: 'Please provide task' });
    }
 
    mc.query("INSERT INTO tasks SET ? ", { task: task }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New task has been created successfully.' });
    });
});


//rest api to update record into mysql database
app.put('/todo/:id', function (req, res) {
    mc.query('UPDATE `tasks` SET `task`=?,`detail`=?, where `id`=?', 
    [req.body.task,req.body.detail, req.params.id], 
    function (error, results, fields) {
       if (error) throw error;
       res.status(200).send({
            msg: "Successfully Processed Your Request.",
            results
        });
     });
 });
 
//  Delete todo
app.delete('/todo/:id', function (req, res) {
 
    let task_id = req.params.id;
 
    mc.query('DELETE FROM tasks WHERE id = ?', [task_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been deleted successfully.' });
    });
});
 
// all other requests redirect to 404
app.all("*", function (req, res) {
    return res.status(404).send('page not found')
});
 
// port must be set to 3000 because incoming http requests are routed from port 80 to port 3000
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
// allows "grunt dev" to create a development server with livereload
//module.exports = app;
