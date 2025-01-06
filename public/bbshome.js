"use strict";// 厳しめモード

let number=0; 
let topic_num=0; //　いくつまで読んだか
let user_id='';
let his_num=0;
const topics = document.querySelector('#topics'); // docment.querySelector('#<-idのやつ')
const histories = document.querySelector('#histories');
document.querySelector('#topic_post').addEventListener('click', () => { // 投稿ボタンが押された時の処理
    const topic = document.querySelector('#topic').value;// //htmlのid=nameの値を読み込む
    console.log(topic);
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
            window.location.href = `/public/test_bbs.html?topic=${encodeURIComponent(topic)}&user_id=${encodeURIComponent(user_id)}`;
        });
    }
});

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
        const urlParams = new URLSearchParams(window.location.search);// urlの'パラメータ'の取得
        user_id = urlParams.get('user_id');// パラメータの中のuser_idを取得
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
            topic_area.href = `/public/test_bbs.html?topic=${encodeURIComponent(top)}&user_id=${encodeURIComponent(user_id)}`;
            cover.appendChild(topic_area);
            topics.appendChild( cover );
            console.log(cover);
            console.log(topics);
        }
        if (user_id) {  // パラメータが存在する場合
            document.querySelector('#user_info').classList.add('hidden');
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
                    topic_area.href = `/public/test_bbs.html?topic=${encodeURIComponent(top)}&user_id=${encodeURIComponent(user_id)}`;
                    cover.appendChild(topic_area);
                    topics.appendChild( cover );
                    console.log(cover);
                    console.log(topics);
                }
                
            })
        }
    })
});

document.querySelector('#id_button').addEventListener('click', ()=> {
    user_id = document.querySelector('#user_id').value;
    window.location.href = `/public/bbshome.html?user_id=${encodeURIComponent(user_id)}`;
});

document.querySelector('#history_button').addEventListener('click', () => {
    console.log('履歴ボタンが押されました');
    //console.log(user_id);
    if(user_id){
        const params = {
            method: "POST",
            body: 'user_id='+user_id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'               
            }
        }
        const url = "/history_check"   //サーバの方の履歴の数を持ってくる
        fetch( url, params )
        .then( (response) => {
            if( !response.ok ) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then( ( response ) => {
            let value = response.num;
            if( his_num != value ){  //今表示させている履歴の数と違かったら表示させる
                console.log('履歴の数違う');
                const params = {
                    method: "POST",
                    body: 'user_id='+user_id+'&his_num='+his_num,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'               
                    }
                }
                const url = "/topic_history"   //書き込んだtopicを持ってくる
                fetch( url, params )
                .then( (response) => {
                    if( !response.ok ) {
                        throw new Error('Error');
                    }
                    return response.json();
                })
                .then(( response ) => {
                    console.log("topic_historyから書き込んだやつの話題を持ってきました");
                    his_num += response.history.length;
                    for( let his of response.history ){
                        let his_cover = document.createElement('div');
                        his_cover.className = 'his_cover';
                        let his_area = document.createElement('a');
                        his_area.className = 'his';
                        his_area.innerText = his;
                        his_area.href = `/public/test_bbs.html?topic=${encodeURIComponent(his)}&user_id=${encodeURIComponent(user_id)}`;
                        his_cover.appendChild( his_area );
                        histories.appendChild( his_cover );
                    }
                });
            }
        });
    }
});