const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://gghh3017:test1234@cluster0.nvonzy2.mongodb.net/?retryWrites=true&w=majority', (req, res) => {
    // connect complet -> app.listen
    app.listen(8080, () => {
        console.log('listening on 8080');
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

app.post('/add', (req, res) => {
    res.send('전송완료')
    console.log(req.body.title)
    console.log(req.body.date)
});