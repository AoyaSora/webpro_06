# webpro_06
10月29日
##　このプログラムについて
ファイル名 | 説明
-|- 
app5.js|プログラム本体
public/janken.html|じゃんけんの開始画面
views/janken.ejs|じゃんけんのテンプレートファイル

## ファイル一覧
```javascript
 console.log('Hello);
```

## 箇条書き
1. ```node app5.js```でapp5.jsを起動する
1. Webブラウザでlocalhost:8080/public/janken.htmlを検索する
1. 自分の出す手を入力する

## 図の描画
```mermaid
 flowchart TD;
 開始 --> 終了;
 なんでもいいんか --> 良さそう --> こんなんでも
 こんなんでも --> |本当に| いいんか --> 終わり
 こんなんでも --> |それはどうなの| ふーん --> 終わり;
 ```

## 凝ったフローチャート
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
### 小見出し
