const express=require('express');

const app=express();
const port=3000;

var bodyParser=require('body-parser');
var connection=require('./config/mysql');
const router = require('./router/router')
//socket.io
var server=app.listen(8085);
var io=require('socket.io').listen(server);
require('./config/socket')(io)


//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
})
//解析body-parser
app.use( bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.urlencoded({limit:'50mb'}));
app.use(bodyParser.json({limit:'50mb'}));
// app.use(express.bodyParser({limit:'5000kb'}));
// app.use(express.json({limit:'5000kb'}));
app.use('/',router)
//设置data静态路径
app.use(express.static(__dirname+'/data'))

require('./config/mysql')
require('./router/fileDeal')(app)



//404界面
app.use(function(req,res,next){
	let err=new Error('not found')
	err.status=404
	next(err)
})


//错误
app.use(function(err,req,res,next){
	res.status(err.status ||500 )
	res.send(err.message)
})




app.listen(port,()=>console.log(`启动端口:${port}`))