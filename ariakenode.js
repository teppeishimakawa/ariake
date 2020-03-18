

var http = require('http');
//var util = require('util');
var fs = require('fs');
var mysql = require('mysql');

var score1= 0;
var score2= 0;
var score3= 0;


const ALLOWED_METHODS = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'HEAD',
    'OPTIONS'
];

var server=http.createServer(function(req, res)
{

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', ALLOWED_METHODS.join(','));
  res.setHeader('Access-Control-Allow-Headers', '*')
        if (req.url.indexOf('/cros-with-credentials/') > -1) {
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }


var url = req.url;
  console.log(url);
  console.log(req.method)



  if ("/index.html" == url)
  {
    fs.readFile("./index.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }else if ("/game_title.html" == url)
  {
    fs.readFile("./game_title.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }else if ("/game.html" == url)
  {
    fs.readFile("./game.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }else if ("/game2.html" == url)
  {
    fs.readFile("./game2.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }else if ("/menu.html" == url)
  {
    fs.readFile("./menu.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });

  }else if ("/result.html" == url)
  {
    fs.readFile("./result.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }

  else if ("/result2.html" == url)
  {
    fs.readFile("./result2.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }

  else if ("/video.html" == url)
  {
    fs.readFile("./video.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }else if("/video/warp.mp4" == url)
      {
          fs.readFile("./video/warp.mp4", function (err, data)
         {
          res.writeHead(200, {"Content-Type": "video/mp4"});
          res.end(data);
         });
      }else if("/video/laughlot.gif" == url)
      {
          fs.readFile("./video/laughlot.gif", function (err, data)
         {
          res.writeHead(200, {"Content-Type": "image/gif"});
          res.end(data);
         });

      }else if("/button/btn1.png" == url)
      {
          fs.readFile("./button/btn1.png", function (err, data)
         {
          res.writeHead(200, {"Content-Type": "image/png"});
          res.end(data);
         });
      }else if("/button/btn2.png" == url)
      {
          fs.readFile("./button/btn2.png", function (err, data)
         {
          res.writeHead(200, {"Content-Type": "image/png"});
          res.end(data);
         });
      }else if("/button/btn3.png" == url)
      {
          fs.readFile("./button/btn3.png", function (err, data)
         {
          res.writeHead(200, {"Content-Type": "image/png"});
          res.end(data);
         });
      }else if ("/rank.html" == url)
  {
    fs.readFile("./rank.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data.replace("<div></div>","<div>合計点数は、<br>第1問:" 
      + score1 +"点<br>" + "第2問:" + score2 + "点で、<br>合計:" + (parseInt(score1)+parseInt(score2)) +"点でした！</div>"));
      res.write(data);
      res.end();
    });
   }



if (req.headers["content-type"] == "application/json")
    {
          req.setEncoding("utf-8");
    req.on("data", function(chunk)
        {
        var data = JSON.parse(chunk);
        if(data.score1)
        {
        console.log(data.score1);
        score1 = Object.assign(data.score1);
        console.log(score1)
        }else if(data.score2)
        {
        console.log(data.score2);
        score2 = Object.assign(data.score2);
        console.log(score2)
        }
        });
     }

   }).listen(8080);






