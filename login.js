var express=require("express");
var bodyParser=require("body-parser");
const app = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
	user: 'root',
	password: '',
	database: 'placement',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
  connection.query('CREATE TABLE IF NOT EXISTS login (id INT AUTO_INCREMENT PRIMARY KEY, univid VARCHAR(255), password VARCHAR(255))', (err, result) => {
    if (err) throw err;
    console.log('Table detail created or already exists.');
  });
});

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.post('/login', function(req,res){
  var univid = req.body.univid;
  var password = req.body.password;

  var data = {
    "univid":univid,
    "password":password
  }


  connection.query('SELECT * FROM login WHERE univid = ?', [univid], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.redirect('duplicate_error.html');
    }
    else {
      connection.query('INSERT INTO login SET ?', data, (err, result) => {
        if (err) throw err;
        console.log("Record inserted Successfully");  
      });

      return res.redirect('survey_success.html');
    }
  });

});


app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect('form.html');

    })

module.exports = app;
