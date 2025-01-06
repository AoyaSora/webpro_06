"use strict";// 厳しめモード

let number=0; //　いくつまで読んだか
const bbs = document.querySelector('#bbs'); // docment.querySelector('#<-idのやつ')
document.querySelector('#post').addEventListener('click', () => { // 投稿ボタンが押された時の処理
    const urlParams = new URLSearchParams(window.location.search);// url取得
    const topic = urlParams.get('topic');// urlの'パラメータ'の取得
    const user_id = urlParams.get('user_id');
    const name = document.querySelector('#name').value;// //htmlのid=nameの値を読み込む
    const message = document.querySelector('#message').value;//htmlのid=nameの値を読み込む
    console.log(topic, name, message);
    if(name != '' && message != ''){
        const params = {  // URL Encode　相手に送るためのパラメータ fecthに対するお知らせもある
            method: "POST",
            body:  'topic='+topic+'&name='+name+'&message='+message+'&user_id='+user_id,  //パラメータ
            // 'topic'+topicボディに追加したい
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        console.log( params );
        const url = "/post";
        fetch( url, params ) // urlにparamsをおくる
        .then( (response) => {
            if( !response.ok ) {
                throw new Error('Error');
            }
            return response.json(); //　サーバから送られてきたメッセージを次のthenに渡す
        })
        .then( (response) => {
            console.log( response ); // 投稿件数
            document.querySelector('#message').value = ""; //投稿内容を空白にしている
        });
    }
});//投稿したらbbsの長さが保存される


document.querySelector('#check').addEventListener('click', () => { // 件数
    const urlParams = new URLSearchParams(window.location.search);// url取得
    const topic = urlParams.get('topic');// urlの'パラメータ'の取得
    const params = {  // URL Encode
        method: "POST",
        body:  'topic='+topic,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number; // 投稿件数bbsの長さ
        console.log( value );

        console.log( number ); // クライアントが持ってきた件数と"今"のサーバの件数/postのとこかな
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number+'&topic='+topic,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                console.log(response.messages);
                for( let mes of response.messages ) {//cssファイルの.mesのとこ？
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');//　一軒分の投稿のための枠 cssファイルの.coverのとこ
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );
                    bbs.appendChild( cover );
                    //console.log(name_area);
                    // console.log(mes_area);
                    console.log(cover);
                    console.log(bbs);
                }
            })
        }
    });
});


window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);// url取得
    const topic = urlParams.get('topic');// urlの'パラメータ'の取得
    console.log();
    const params = {
        method: "POST",
        body: 'topic='+topic+'&start='+0,///////// <<<<<<<
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const url = "/read"; ////// <<<<<<< content_readいらんのでは??
    fetch( url, params)
    .then( ( response ) => {
        if(!response.ok){
            throw new Error('Error at topic_read');
        }
        return response.json();
    })
    .then(( response ) => {
        console.log(response.messages ); // contentをmessagesに変えた
        number += response.messages.length; // ここできたらいいな
        console.log('読んだ数'+number)
        for( let mes of response.messages){
            console.log(mes);
            let cover = document.createElement('div'); //一行
            cover.className = 'cover';
            let name_area = document.createElement('span');
            name_area.className = 'name';
            name_area.innerText = mes.name;
            let mes_area = document.createElement('span');
            mes_area.className = 'mes';
            mes_area.innerText = mes.message;
            cover.appendChild(name_area);
            cover.appendChild(mes_area)
            bbs.appendChild( cover );
            console.log(cover);
            console.log(bbs);
        }
    })
});