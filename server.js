var express = require('express')
var app = express();
var cors = require('cors');
var serveStatic = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser')
Array.prototype.shuffle
app.use(cors());
app.set('views', __dirname+"/views");
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


objs1 = [
    {name:"황윤서", vote:0},
    {name:"오준상", vote:0},
    {name:"김도희", vote:0},
    {name:"김기욱", vote:0},
    {name:"김초연", vote:0},
    {name:"이형진", vote:0},
    {name:"백서영", vote:0},
    {name:"양재훈", vote:0},
    {name:"박진홍", vote:0},
    {name:"박재훈", vote:0},
    {name:"박수혁", vote:0},
    {name:"이성진", vote:0},
    {name:"최승교", vote:0},
    {name:"이재관", vote:0}
]

objs2 = [
    {name:"정근재", vote:0}, // 1반
    {name:"홍성하", vote:0},
    {name:"김영한", vote:0},
    {name:"성유정", vote:0},
    {name:"이주용", vote:0},
    {name:"노시현", vote:0}, // 2반
    {name:"최이삭", vote:0},
    {name:"김도훈", vote:0},
    {name:"김상은", vote:0},
    {name:"이채은", vote:0},
    {name:"안소현", vote:0}, // 3반
    {name:"최소영", vote:0},
    {name:"남유림", vote:0},
    {name:"황신우", vote:0},
    {name:"장호승", vote:0},
    {name:"장윤수", vote:0},
    {name:"최지웅", vote:0}, // 4반
    {name:"김태현", vote:0},
    {name:"김소연", vote:0},
    {name:"박예린", vote:0},
]

var sortingField = "vote";
var testobj = [];
app.post('/add',function(req,res){
    name = req.body.name;
    
    for (var i = 0; i < name.length; ++i)
        testobj[i] = {name : name[i], vote : 0};
    console.log(testobj);
});

//랜덤 출력
var random = [];
app.get('/random',function(req,res) {
    random = objs1;
    var j;
    var x;
    var i;
    for (i = random.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = random[i - 1];
        random[i - 1] = random[j];
        random[j] = x;
    }
    console.log(random);

    let test = JSON.stringify(random);
    res.send(test);

});




//투표하기
app.get('/1',function(req,res){
    res.render('1grade.html');
});
app.get('/2',function(req,res){
    res.render('2grade.html');
});

var count_1 = 0;
var count_2 = 0;

//투표처리
app.get('/poll1',function(req,res){
    i = req.query.fst
    j = req.query.scd
    objs1[i-1].vote++;
    objs1[j-1].vote++;
    count_1++;
    console.log(objs1);
    res.status(200).end();
});
app.get('/poll2',function(req,res){
    i = req.query.fst
    j = req.query.scd
    objs2[i-1].vote++;
    objs2[j-1].vote++;
    count_2++;
    console.log(objs2);
    res.status(200).end();
});

app.get('/count_1',function(req,res){
    res.end(count_1+"");
});

app.get('/count_2',function(req,res){
    res.end(count_2+"");
});

//모두확인
app.get('/result1',function(req,res){
    let asd = JSON.stringify(objs1);
    asd = JSON.parse(asd);
    let ch_list = JSON.stringify(asd.sort(function(a, b){ // 내림차순
        return b[sortingField] - a[sortingField];
    }));
    res.send(ch_list);
});
app.get('/result2',function(req,res){
    let asd = JSON.stringify(objs2);
    asd = JSON.parse(asd);
    let ch_list = JSON.stringify(asd.sort(function(a, b){ // 내림차순
        return b[sortingField] - a[sortingField];
    }));
    res.send(ch_list);
});

app.listen(3000, function(){
    console.log('running on 3000 port')
    console.log("----------------1grade----------------")
    console.log(objs1);
    console.log("----------------2grade----------------")
    console.log(objs2);
    console.log("-----------------end------------------");
});