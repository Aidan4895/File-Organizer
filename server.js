const express = require('express');
const path = require('path');

var app = express()

app.use(express.urlencoded({ extended: true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', function(req, res){
  res.render('organizer', {

  })
})
app.post('/action_page.php', function(req, res){
  if (req.body.file){
    console.log('working')
    res.render('organizer2', {
      yell: `You submitted: ${req.body.file}`
    })
  }
})
var server = app.listen(8000, function(){
  var host = server.address().address
  var port = server.address().port
  console.log("listening")
})
