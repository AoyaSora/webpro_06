"use strict";
const express = require("express");
const app = express();

let bbs = {};  // {topic:[{name,message},{name,message}], }

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//topic_OOはbbshome関連
app.post("/topic_post", (req, res)=>{
    const topic = req.body.topic;
    if(!bbs[topic]) bbs[topic] = [];
    res.json({topic: topic});
});

app.post("/topic_read", (req,res) => {
    const start = Number(req.body.start);
    console.log('TopicReadPoint -> '+ start);
    const topic_list =  Object.keys(bbs);
    if(start == 0) res.json({topic_list: topic_list});//全ての話題を取り出した
    else res.json({topic_list: topic_list.slice( start )});
});

app.post("/topic_check", (req, res) => {// appにある話題の数を返す
    const list = Object.keys(bbs);
    const number = list.length;
    res.json( { number: number});
});


// これより下はBBS関係
app.post("/check", (req, res) => {
    // 本来はここでDBMSに問い合わせる
    const topic = req.body.topic;
    res.json( {number: bbs[topic].length });
});

app.post("/read", (req, res) => {
    // 本来はここでDBMSに問い合わせる
    const start = Number( req.body.start );//"今"htmlに表示されているbbsの数
    const topic = req.body.topic;
    console.log( "read -> " + start );
    console.log(bbs[topic]);
    if( start==0 ) res.json( {messages: bbs[topic] });//まだ表示させていなかったら全てのbbsを送信
    else res.json( {messages: bbs[topic].slice( start )});//startから最後までのbbsを送信
});

app.post("/post", (req, res) => {
    const topic = req.body.topic;
    const name = req.body.name;//name=name
    const message = req.body.message;//message=message
    console.log( [topic, name, message] );
    // 本来はここでDBMSに保存する
    bbs[topic].push( { name: name, message: message } );//bbsにnameとmessageを追加する
    console.log(bbs[topic]);
    console.log(bbs[topic].length);
    res.json( {number: bbs[topic].length } );//numberをbbsの長さとして返す
});

// app.post("/bbs", (req,res) => {
//       console.log("POST /BBS");
//       res.json( {test: "POST /BBS"});
// });
 
// app.put("/bbs/:id", (req,res) => {
//       console.log( "PUT /BBS/" + req.params.id );
//       res.json( {test: "PUT /BBS/" + req.params.id });
// });
  
// app.delete("/bbs/:id", (req,res) => {
//       console.log( "DELETE /BBS/" + req.params.id );
//       res.json( {test: "DELETE /BBS/" + req.params.id });
// });
  
app.listen(8080, () => console.log("Example app listening on port 8080!"));