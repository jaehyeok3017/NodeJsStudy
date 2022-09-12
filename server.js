const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true})); 

let db;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://gghh3017:test1234@cluster0.nvonzy2.mongodb.net/?retryWrites=true&w=majority', (error, client) => {
    if(error) return console.log(error);    
    db = client.db('todoapp');

    app.listen(8080, () => {
        console.log('listening on 8080');
    });
    
    app.post('/add', (req, res) => {
        res.send('전송완료');

        db.collection('counter').findOne({name : '게시물갯수'}, (error, result) => {
            console.log(result.totalPost);
            let total = result.totalPost;
        
            db.collection('post').insertOne( { _id : total + 1 , title : req.body.title, date : req.body.date } , (error, result) => {
                console.log('저장완료');

                db.collection('counter').updateOne({name : '게시물갯수'}, { $inc : {totalPost : 1} }, (error, result) => {
                    if(error) return console.log(error);
                });
            });
        });
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/write.html');
});

app.get('/list', (req, res) => {
    db.collection('post').find().toArray((error, result) => {
        console.log(result);
        res.render('list.ejs', { posts : result });
    });    
});

app.get('/pet', (req, res) => {
    res.send('펫 용품을 쇼핑할 수 있는 페이지입니다');
});

app.get('/beauty', (req, res) => {
    res.send('뷰티 용품을 쇼핑할 수 있는 페이지입니다');
});
