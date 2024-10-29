const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  
  let hand = req.query.hand;
  let result = 0;
  //Number(数字)として取得
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  //console.logは値の取得確認
  console.log( {hand, win, total});

  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  if(hand == "ちんちん") {
    hand = '汚い';
    result = '品格の敗北';
  }
  else if(hand !='グー'&& hand != 'チョキ' && hand !='パー' ){
    hand = ("グーかチョキかパーでしか反応できない");
    result = 'error';
  }
  else if(cpu == 'グー' && hand == 'パー'||cpu == 'チョキ' && hand == 'グー'||cpu == 'パー' && hand == 'チョキ'){
    win += 1;
    result = '勝ち';
    total += 1;
  }else if(cpu ==  hand ){
    result = 'あいこ';
    total += 1;
  }else{
    result = '負け';
    total += 1;
  }

  // 今はダミーで人間の勝ちにしておいた(変更済み)
  let judgement = result;

  //変数確認用
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
