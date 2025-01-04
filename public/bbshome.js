"use strict";// 厳しめモード

let number=0; //　いくつまで読んだか
let topic_num=0;
const topics = document.querySelector('#topics'); // docment.querySelector('#<-idのやつ')
document.querySelector('#topic_post').addEventListener('click', () => { // 投稿ボタンが押された時の処理
    const topic = document.querySelector('#topic').value;// //htmlのid=nameの値を読み込む
    // const message = document.querySelector('#message').value;//htmlのid=nameの値を読み込む
    console.log(topic);
    //document.querySelector('#topic').value = ""; //投稿内容を空白にしている
    if(topic != ''){
        const params = {  // URL Encode　相手に送るためのパラメータ fecthに対するお知らせもある
            method: "POST",
            body:  'topic='+topic,  //パラメータ
            // 'topic'+topicボディに追加したい
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        console.log( params );
        const url = "/topic_post";
        fetch( url, params ) // urlにparamsをおくる
        .then( (response) => {
            if( !response.ok ) {
                throw new Error('Error');
            }
            return response.json(); //　サーバから送られてきたメッセージを次のthenに渡す
        })
        .then( (response) => {
            console.log( response ); // 投稿件数
            document.querySelector('#topic').value = ""; //投稿内容を空白にしている
            // let topic_area = document.createElement('div');
            // topic_area.className = 'topic';
            // topic_area.innerText = topic;
            // topics.appendChild(topic_area);
            window.location.href = `/public/test_bbs.html?topic=${encodeURIComponent(topic)}`; // <= イマココ変えた
        });
    }
});//投稿したらbbsの長さが保存される

window.addEventListener('load', () => {
    console.log();
    const params = {
        method: "POST",
        body: 'start='+0,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const url = "/topic_read";
    fetch( url, params)
    .then( ( response ) => {
        if(!response.ok){
            throw new Error('Error at topic_read');
        }
        return response.json();
    })
    .then(( response ) => {
        console.log("話題だけ:" + response.topic_list );
        topic_num += response.topic_list.length;
        for( let top of response.topic_list){
            console.log(top);
            let cover = document.createElement('div'); //一行
            cover.className = 'cover';
            let topic_area = document.createElement('a');
            topic_area.className = 'topic';
            topic_area.innerText = top;
            // topic の情報をクエリパラメータとして渡す
            topic_area.href = `/public/test_bbs.html?topic=${encodeURIComponent(top)}`;
            cover.appendChild(topic_area);
            topics.appendChild( cover );
            console.log(cover);
            console.log(topics);
        }
    })
});

// 更新ボタン
document.querySelector('#topic_update').addEventListener('click', () => {
    // appの話題の数を持ってくる
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/topic_check";
    fetch( url, params)
    .then((response) => {
        if(!response.ok){
            throw new Eroor('Error at update');
        }
        return response.json()
    })
    .then(( response ) => {
        let value = response.number; //appの話題の数
        if (topic_num != value ){
            const params = {
                method: "POST",
                body: 'start='+topic_num,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/topic_read"//追加分を持ってきてくれるやつ
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {// ここでdivとかの追加
                topic_num += response.topic_list.length;
                console.log(response.topic_list);
                for( let top of response.topic_list){
                    console.log(top);
                    let cover = document.createElement('div'); //一行
                    cover.className = 'cover';
                    let topic_area = document.createElement('a');
                    topic_area.className = 'topic';
                    topic_area.innerText = top;
                    topic_area.href = `/public/test_bbs.html?topic=${encodeURIComponent(top)}`;
                    cover.appendChild(topic_area);
                    topics.appendChild( cover );
                    console.log(cover);
                    console.log(topics);
                }
            })
        }
    })
})