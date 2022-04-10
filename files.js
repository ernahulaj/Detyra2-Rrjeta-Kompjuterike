var http = require('http');
var fs = require('fs');
const res = require('express/lib/response');
var formidable = require('formidable');
const { reader } = require('./listFiles');
url = require('url');
path = require('path')
imageDir = 'C:/users/ernah/onedrive/desktop/Line Up Fotos/';

const PORT=3000;

function permissions(){
  http.createServer(function (req, res){
    if(req.url == '/'){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("You have access! Click to go to homepage."); 
      res.write("<br/><a href='/home'>Go to home</a><br/>");  
    }else if (req.url == '/home') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("<a href='/upload'>Upload</a><br/>");
      res.write("<a href='/read'>Read</a><br/>");    
      return res.end();
    }else if(req.url == '/upload'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit" onClick="opener.location="127.0.0.1/fileupload"">');
        res.write('</form>');
        return res.end();
    }else if (req.url == '/fileupload') {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.filepath;
        var newpath = 'C:/Users/ernah/onedrive/desktop/detyra2rrjeta/' + files.filetoupload.originalFilename;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write('File uploaded and moved!');
          res.end();
        });
   });
     } else if(req.url == '/read'){
      reader(req,res);
     }
  }).listen(PORT);  

}

module.exports = {
  permissions,
}
