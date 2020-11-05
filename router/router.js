var connection=require('../config/mysql');
const express=require('express');
const app=express();
const router=express.Router()
//该插件可获取前端数据
const bodyParser=require('../node_modules/_body-parser@1.19.0@body-parser');
//解析
app.use(bodyParser.urlencoded({extended: true}) );
app.use(bodyParser.json());


//注册
router.get('/login',(req,res)=>{
	let loginMsg=req.query;
	let {user,email,password} = loginMsg;
	res.send(connection.loginMatch(user,email,password));
});
//登录
router.post('/test',(req,res)=>{
	let signinMsg=req.body;
	console.log(req.body)
	let {name,password} = signinMsg;
	let data=connection.signinMatch(name,password);
	res.send(data);
});
router.post('/friendquest',(req,res)=>{
	let id=req.body.id
	let data=connection.getapply(id)
	res.send('well done')
})
router.post('/getquest',(req,res)=>{
	let data=connection.friendQuest()
	res.send(data)
})
//获取好友列表
router.post('/getfriend',async (req,res)=>{	
	let id=req.body.id
	// console.log(id)
	let result = await connection.qqquery('select * from t_friend where (sendid = ? or receid =?) and type=2',[id,id])
	// console.log(result)
	res.send(result)
});
//获取好友状态
router.post('/getfriendtype',async (req,res)=>{
	let {sendid,receid}=req.body
	let result = await connection.qqquery('select * from t_friend where (sendid = ? and receid =? ) or ( sendid = ? and receid =? )',[sendid,receid,receid,sendid])
	res.send(result)
})

//申请好友
router.post('/apply',(req,res)=>{
	let {sendid,receid,msg}=req.body
	let data=connection.addfriend(sendid,receid,msg)
	res.send(data)
});
//获取自己以外所有人的信息
router.post('/getAll',(req,res)=>{
	let id=req.body.id
	let data=connection.getAll(id)
	res.send(data)
})
//找人
// router.post('/idfind',(req,res)=>{
// 	let id=req.body.id
// 	let data=connection.idFind(id)
// 	res.send(data)
// })

//获取聊天信息
router.post('/getMsg',async (req,res)=>{
	let {uid,fid}=req.body
	let sql='select * from t_msg where (sendid=? and receid=?) or (sendid=? and receid=?)'
	let result=await connection.qqquery(sql,[uid,fid,fid,uid])
	res.send(result)
})
//发送消息
router.post('/addMsg',async (req,res)=>{
	let sendtime=new Date()
	// console.log(sendtime)
	let {sendid,receid,msg,msgtype}=req.body
	// console.log(receid)
	let post = {
	   sendid,
	   receid,
	   msg,
	   msgtype,
	   sendtime,
	   type:0
	};
	let result=await connection.qqquery("INSERT INTO t_msg SET ?",post)
	res.send('well done')
})

router.post('/idfind',async (req,res)=>{
	let id= req.body.id
	let result = await connection.qqquery('select * from t_user where userid=?',id)
	// console.log(result)
	res.send(result)
})
router.post('/idfindmsg',async (req,res)=>{
	let id= req.body.id
	let result = await connection.qqquery('select * from t_msg where sendid=? or receid =?',[id,id])
	// console.log(result)
	res.send(result)
})

//通过申请
router.post('/agreen',(req,res)=>{
	let {sid,rid}=req.body
	connection.agreen(sid,rid)
	res.send('well done')
})
router.post('/refuse',(req,res)=>{
	let {sid,rid}=req.body
	connection.refuse(sid,rid)
	res.send('well done')
})
module.exports = router;