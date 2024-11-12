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