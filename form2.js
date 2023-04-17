var express=require("express");
var bodyParser=require("body-parser");
const app = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
	user: 'root',
	password: '',
	database: 'placement'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
  // Create the detail table
  connection.query('CREATE TABLE IF NOT EXISTS detail (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), gender VARCHAR(255), univid VARCHAR(255), email VARCHAR(255), phone VARCHAR(255), cpi VARCHAR(255), attendence VARCHAR(255), backlogs VARCHAR(255), tech VARCHAR(255), jobRole VARCHAR(255))', (err, result) => {
    if (err) throw err;
    console.log('Table detail created or already exists.');
  });
});

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.post('/survey_form', function(req,res){
  var name = req.body.name;
  var gender = req.body.gender;
  var univid = req.body.univid;
  var email =req.body.email;
  var phone =req.body.phone;
  var cpi = req.body.cpi;
  var attendence = req.body.attendence;
  var backlogs = req.body.backlogs;
  var tech = req.body.tech;
  var jobRole = req.body.myList;

  var data = {
    "name": name,
    "gender":gender,
    "univid":univid,
    "email":email,
    "phone":phone,
    "cpi":cpi,
    "attendence":attendence,
    "backlogs":backlogs,
    "tech":tech,
    "jobRole":jobRole
  }


  connection.query('SELECT * FROM detail WHERE univid = ?', [univid], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.redirect('duplicate_error.html');
    }
    else {
      connection.query('INSERT INTO detail SET ?', data, (err, result) => {
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
