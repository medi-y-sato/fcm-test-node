var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")

var port = process.argv[2] || 8888
var mimeTypes={
  '.html' : 'text/html',
  '.js' : 'text/javascript',
  '.jpg' : 'image/jpg',
};

http.createServer(function(req, res) {

  var Response = {
    "200":function(file, filename){
      var extname = path.extname(filename);
      res.writeHead(200, {
        "Content-Type" : mimeTypes[extname],
        "Access-Control-Allow-Origin":"*",
        "Pragma": "no-cache",
        "Cache-Control" : "no-cache"
      });
      res.write(file, "binary");
      res.end();
    },
    "404":function(){
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.write("404 Not Found\n");
      res.end();
    },
    "500":function(err){
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.write(err + "\n");
      res.end();
    }
  }


  var uri = url.parse(req.url).pathname, filename = path.join(process.cwd(), uri);

  if (uri === '/send'){
    if(req.method=='GET') {
      var url_parts = url.parse(req.url,true);
      var match = /https:\/\/android.googleapis.com\/gcm\/send\/(.*)/
      endpoint = match.exec(url_parts.query.endpoint)[1]
      console.log('receive endpoint : ' + endpoint)
      console.log('use this command line to send pus message')
      console.log('$ node pushMessage.js -e ' + endpoint + ' -m <message>')

      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write("accepted\n");
      res.end();
    }
  } else {

    fs.exists(filename, function(exists){
      console.log(filename+" "+exists);
      if (!exists) {
        Response["404"]();
        return ;
      }
      if (fs.statSync(filename).isDirectory()) {
        filename += '/index.html';
      }

      fs.readFile(filename, "binary", function(err, file){
        if (err) {
          Response["500"](err);
          return ; 
        }
        Response["200"](file, filename);
      });

    });
  }

}).listen(parseInt(port, 10));

console.log("Server running at http://localhost:" + port );
