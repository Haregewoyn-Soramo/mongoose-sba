const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
  res.render('home')
})

router.get('/signin', (req, res) =>{
  res.render('signIn')
})


module.exports = router;