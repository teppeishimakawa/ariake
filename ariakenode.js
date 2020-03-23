//mysql pass:ariake


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
  /*
  }else if ("/game2.html" == url)
  {
    fs.readFile("./game2.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  */
  }else if ("/menu.html" == url)
  {
    fs.readFile("./menu.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }else if("/style.css" == url)
    {
     fs.readFile("./style.css", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/css"});
      res.write(data);
      res.end();
    });
    }
  else if ("/result.html" == url)
  {
    fs.readFile("./result.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }
/*
  else if ("/result2.html" == url)
  {
    fs.readFile("./result2.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }
*/
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




/* ok文章
       connection.query('SELECT GROUP_CONCAT(total ORDER BY total DESC)FROM ariaketable;', function (err, result1) 
     {
       console.log(result1);
*/
      //asで名前つける時は""で囲むの超重要！！
       connection.query('SELECT id,COALESCE(name,"unknown") as name,COALESCE(score1,0) as score1,COALESCE(score2,0) as score2,COALESCE(score3,0) as score3,total,FIND_IN_SET(total,(SELECT GROUP_CONCAT(total ORDER BY total DESC)FROM ariaketable)) as "rank" FROM ariaketable ORDER BY total DESC;', function (err, result2) 
     {
       if (err) { console.log('esrr: ' + err); }
       //表示用最終結果
       console.log(result2);


       connection.query('SELECT FIND_IN_SET(total,(SELECT GROUP_CONCAT(total ORDER BY total DESC)FROM ariaketable)) as "rank" from ariaketable WHERE id=' + cnt + ';', function (err,result3) 
       {
        if (err) throw err;
        console.log(result3);

       //SELECT id, name, total, FIND_IN_SET(total, (120,116,83,66,66,58)) as rank from ariaketable;

/*
     //並び替え
            connection.query('select * from ariaketable order by total desc;', function (err, result) 
     {
       if (err) { console.log('esrr: ' + err); }
       console.log(result);
*/
/*
     //行番号付
　　　　connection.query('select@rownum:=@rownum+1 as row_num,total from (SELECT @rownum:=0) AS ROW_NUM_TBL,ariaketable;', function (err, result) 
     {
       if (err) { console.log('esrr: ' + err); }
       console.log(result);　
*/



      //↓readFileするのはejs.htmlな点注意!!
      fs.readFile("./rank.ejs.html", "UTF-8", function (err, data)
      {


        var i;
        var rend = ejs.render(data, {
        content:"得点は、&nbsp;&nbsp;第1問:<span style='font-family :Quicksand, sans-serif;color: #2f4f4f;font-size: 32px;'>"
       + res1 +"</span>点&nbsp;&nbsp;&nbsp;&nbsp;" + "第2問:<span style='font-family :Quicksand, sans-serif;color: #2f4f4f;font-size: 32px;'>" + res2 + 
       "</span>点で、&nbsp;&nbsp;&nbsp;&nbsp;合計:<span style='font-family :Quicksand, sans-serif;color: #2f4f4f;font-size: 32px;'>"
        + (parseInt(res1) + parseInt(res2)) +"</span>点&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;結果は、第<span style='font-family :Quicksand, sans-serif;color: #2f4f4f;font-size: 32px;'>" + result3[0].rank + "</span>位でした！",
        result:result2,
        });

       res.writeHead(200, {"Content-Type": "text/html"});

       /*
       res.write(data.replace("<div></div>","<div>合計点数は、<br>第1問:"
       + res1 +"点<br>" + "第2問:" + res2 + "点で、<br>合計:" + (parseInt(res1) + parseInt(res2)) +"点でした！</div>"));*/
       res.write(rend);
       res.end();
       });

  　　});
  //select total score query
    });
  //select id query
   });
 }





//////////////////////post/////////////////////////
if (req.headers["content-type"] == "application/json")
{
          req.setEncoding("utf-8");
    req.on("data", function(chunk)
    {
        var data = JSON.parse(chunk);

        //score1
        if(data.score1 || data.score1==0)
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
        //score2
      }else if(data.score2 || data.score2==0)
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

       //total登録
       connection.query("UPDATE ariaketable SET total=(COALESCE(score1, 0) + COALESCE(score2, 0) + COALESCE(score3, 0));", function (err, result) 
       {
       if (err) { console.log('esrr: ' + err); }
       console.log(result);

       connection.query('SELECT * from ariaketable;', function (err, rows, fields) 
       {
       if (err) { console.log('esrr: ' + err); }
       console.log(rows);
       });

   });
  //query select
   });


 //else if(gakkou)
    }else if(data.gakkou || data.gakkou=="")
      {
        var gakkou = Object.assign(data.gakkou);
        console.log(gakkou)
        console.log(String(gakkou));
        connection.query("UPDATE ariaketable SET name=" +"'" + gakkou + "'" + " WHERE id=" + cnt + ";" , function(err, result)
       {
       if (err) throw err;
       console.log(result);
      connection.query('SELECT * from ariaketable;', function (err, rows, fields) 
       {
       if (err) { console.log('esrr: ' + err); }
       console.log(rows);
       });



       });
        //gakkou
      }
 //req.on
 });
//(req.headers["content-type"] == "application/json")///////////////////
}

   }).listen(8080);



