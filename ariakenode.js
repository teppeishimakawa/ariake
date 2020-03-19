

var http = require('http');
//var util = require('util');
var fs = require('fs');
var mysql = require('mysql');
var ejs = require('ejs');


var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ariake',
    database:'ariake'
});
connection.connect();


var score1= 0;
var score2= 0;
var score3= 0;
var cnt=0;
var res1=0;
var res2=0;
var res3=0;


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
      }else if ("/rank.ejs" == url)
  {

       connection.query('SELECT * from ariaketable where id=' + cnt + ';', function (err, result) 
    {
       if (err) { console.log('esrr: ' + err); }
       console.log(result);
       console.log(result[0].score1);
       //objectAssignしてもfunctionで包まないとreadFileにres反映されず
       res1 = Object.assign(result[0].score1);
       res2 = Object.assign(result[0].score2);



       connection.query('ALTER TABLE ariaketable ADD total integer AS (COALESCE(score1, 0) + COALESCE(score2, 0) + COALESCE(score3, 0)) stored;', function (err, result) 
     {
       if (err) { console.log('esrr: ' + err); }
       console.log(result);


            connection.query('select * from ariaketable order by total desc;', function (err, result) 
     {
       if (err) { console.log('esrr: ' + err); }
       console.log(result);



/*connection.query('select@rownum:=@rownum+1 as row_num,score1 from (SELECT @rownum:=0) AS ROW_NUM_TBL,ariaketable;', function (err, result) 
     {
       if (err) { console.log('esrr: ' + err); }
       console.log(result);　*/

      //↓readFileするのはejs.htmlな点注意!!
      fs.readFile("./rank.ejs.html", "UTF-8", function (err, data)
      {var i;
        var rend = ejs.render(data, {
        content:"合計点数は、<br>第1問:"
       + res1 +"点<br>" + "第2問:" + res2 + "点で、<br>合計:" + (parseInt(res1) + parseInt(res2)) +"点でした！",
       result:result,
        });

       res.writeHead(200, {"Content-Type": "text/html"});

       /*
       res.write(data.replace("<div></div>","<div>合計点数は、<br>第1問:"
       + res1 +"点<br>" + "第2問:" + res2 + "点で、<br>合計:" + (parseInt(res1) + parseInt(res2)) +"点でした！</div>"));*/
       res.write(rend);
       res.end();
       });

  //sort
     });
  //select total score query
    });
  //select id query
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


        connection.query("INSERT INTO ariaketable (score1) VALUES ("+　parseInt(score1) +")", function(err, result)
        {
        if (err) throw err;
        console.log(result);
        })
        connection.query('SELECT * from ariaketable;', function (err, rows, fields) 
        {
        if (err) { console.log('err: ' + err); }
        console.log(rows);
        });
      }else if(data.score2)
 {
        score2 = Object.assign(data.score2);
        console.log(score2)


    connection.query('SELECT * from ariaketable;', function (err, rows, fields) 
    {
       if (err) { console.log('err: ' + err); }
       if(rows.length > 2 && rows[rows.length-3].score2 === null){cnt = Object.assign(rows[rows.length-3].id);}
       else if(rows.length > 1 && rows[rows.length-2].score2 === null){cnt = Object.assign(rows[rows.length-2].id);}else
       {cnt = Object.assign(rows[rows.length-1].id);}
         console.log(rows);
         console.log(cnt);
       connection.query("UPDATE ariaketable SET score2="+ parseInt(score2) + " WHERE id=" + cnt + ";" , function(err, result)
       {

       if (err) throw err;
       console.log(result);
       })

       connection.query('SELECT * from ariaketable;', function (err, rows, fields) 
       {
       if (err) { console.log('esrr: ' + err); }
       console.log(rows);
       });


  //query select
   });


 //else if(data.score2)
 }
 //req.on
 });
//(req.headers["content-type"] == "application/json")
}

   }).listen(8080);



