const express = require('express');
const app = express();

let db;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://gghh3017:test1234@cluster0.nvonzy2.mongodb.net/?retryWrites=true&w=majority', (error, client) => {
    if(error) return console.log(error);    
    db = client.db('todoapp');

    db.collection('post').insertOne( {_id : 100, 이름 : 'Jaehyeok', 나이 : 17} , (error, result) => {
        console.log('저장완료');
    });

    app.listen(8080, () => {
        console.log('listening on 8080');
    });
    
    app.post('/add', (req, res) => {
        res.send('전송완료')
        
        db.collection('post').insertOne( {_id : 101, 제목 : req.body.title, 날짜 : req.body.date} , (error, result) => {
            console.log('저장완료');
        });
    });
});

app.use(express.urlencoded({extended: true})); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/write.html');
});

app.get('/pet', (req, res) => {
    res.send('펫 용품을 쇼핑할 수 있는 페이지입니다');
});

app.get('/beauty', (req, res) => {
    res.send('뷰티 용품을 쇼핑할 수 있는 페이지입니다');
});
