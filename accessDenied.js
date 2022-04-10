var http = require('http');
const {reader} = require('./listFiles');

function readOnly(){
    http.createServer(function (req, res) {
        if(req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("You have read only access! Click to go to homepage."); 
            res.write("<br/><a href='/home'>Go to home</a><br/>");  
          }else if (req.url == '/home') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<a href='/upload'>Upload</a><br/>");
            res.write("<a href='/read'>Read</a><br/>");    
            return res.end();
          }else if(req.url == '/upload'){
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('You do not have access to this page!\nTry contacting your administrator.');
            res.end();
          }else if(req.url == '/read'){
            reader(req,res);
        }
      }).listen(3000);

}

module.exports = {
    readOnly,
}