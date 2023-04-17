const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const loginRouter = require('./login2');
const formRouter = require('./form2'); 
// const loginRouter2 = require('./login');

app.use(loginRouter);
app.use(formRouter);
// app.use(loginRouter2);

app.listen(4000, () => console.log('Server started'));