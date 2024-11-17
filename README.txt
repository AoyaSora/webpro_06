```javascript
 console.log('Hello);
```

```mermaid
 flowchart TD;
 開始 --> 終了;
 なんでもいいんか --> 良さそう --> こんなんでも
 こんなんでも --> |本当に| いいんか --> 終わり
 こんなんでも --> |それはどうなの| ふーん --> 終わり;
```


```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"菱形になる"}
win["勝ち"]
loose["負け"]

start --> if
if --> |yes| win
win --> end1
if --> |no| loose
loose --> end1
```

じゃんけんの入力に対して勝敗を表示させるためのものである．また他の入力として運勢ボタンと勝率により勝敗を予想するボタンがある．
複数行コメントアウトはcommand+/

janken.htmlからjanken.ejsへの結果表示の処理(app.get("\janken")...)

グーチョキパーを選び```じゃんけん　ポン```ボタンが押されたら，app5.jsでユーザからの手を受け取る．cpuの手をランダムで決まり，ユーザの手とcpuの手で勝敗を判断し，勝敗，勝利数，総試合数，ユーザとcpuの手をjanken.ejsに送信する．