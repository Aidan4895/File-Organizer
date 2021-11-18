const express = require('express');
const path = require('path');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');

var app = express()

app.use(express.urlencoded({ extended: true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', function(req, res){
  var rawfile = fs.readFileSync('files.json')
  var file = JSON.parse(rawfile)
  res.render('organizer', {
    filelist: file.files
  })
})
app.post('/action_page.php', upload.single('filename'), function (req, res, next) {
  console.log(req.file);
  var rawfile = fs.readFileSync('files.json')
  var file = JSON.parse(rawfile)
  console.log(file)
  file["files"].push(req.file.originalname)

  var sendfile = JSON.stringify(file)
  console.log(sendfile)
  fs.writeFile("files.json",sendfile,"utf8",function(){
  console.log("file sent")
  })
  fs.rename('uploads/' + req.file.filename, 'uploads/' + req.file.originalname, function(){
    console.log("Rewrote File")
  })
  res.render('organizer', {
    filelist: file.files
  })
})
/*app.post('/action_page.php', function(req, res){
  console.log(req.body.file);
  if (req.body.file){
    console.log('working')
    res.render('organizer2', {
      yell: `You submitted: ${req.body.file}`
    })
  } else {
    res.render('organizer2', {
      yell: `AAAAHAHHHHHHH!!!!`
    })
  }
})
*/
var server = app.listen(8000, function(){
  var host = server.address().address
  var port = server.address().port
  console.log("listening")
})
