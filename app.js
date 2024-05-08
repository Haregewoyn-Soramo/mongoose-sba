require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port =  process.env.PORT || 3000;
const router = require('./server/routes/main');
const connectDB = require('./server/config/db')
const bodyParser = require('body-parser');

connectDB()
app.use(express.json());
process.setMaxListeners(15);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/main'); 
app.set('view engine', 'ejs'); 

app.use('/',router)



app.listen(port, () => {
  console.log('You are listening on port:', port);
});
