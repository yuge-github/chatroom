var bcrypt     = require('../config/bcrypt');
var mysql      = require('mysql');
var jwt        = require('../config/jwt');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '110154',
  database : 'chatroom',
  multipleStatements: true,
});
//目前大概需要三个表：1.用户表 2.朋友表 3.1对1关系表
const user='';
const friends='';
const apply='';
const allother='';
const friend='';
//注册匹配
connection.loginMatch=function(name,email,password){
	
	let sql='select * from t_user where name=? or email=?';
	let query=connection.query(sql,[name,email],function (error, result, fields) {
        if (error) throw error;
		console.log(result);
		if(result.length){
			console.log('已存在的用户')
		}else{
			connection.adduser(name,email,password) 
		}
		
    });
	
}
//注册用户
connection.adduser=function(name,email,password) {
	// let psw=bcrypt.encryption(password);
    let post = {
        name,
        email,
		gender:0,
		password,
        birthday:new Date(),
		phone:00000000000,
		signature:'这个人很懒，什么都没有留下',
		imgurl:'头像1.jpg',
		loginT:new Date()
    };
    let query = connection.query("INSERT INTO t_user SET ?", post, function (error, result, fields) {
        if (error) throw error;
		if(result){
			console.log('注册成功')
		}
    });
    // console.log(query.sql); //INSERT INTO posts 'id'=1, 'title'='Hello MySQL'
};
//匹配用户(登录)
connection.signinMatch=function(name,password) {
	let sql="select * from t_user where (name= ? or email= ? ) and password = ?";
	let promise=new Promise((resolve,reject)=>{
		connection.query(sql, [name,name,password], function (error, result,fields) {
			if(error){
				reject(error)
			};
			if(result){
				const token=jwt.indentityToken(result.id)
				console.log(token)
				const payload=jwt.verifyToken(token)
				console.log(payload)
			}
			resolve(result,fields)
		});
	})
	.then((res)=>this.user=res);
	return this.user;
	// console.log(1)
    
    //INSERT INTO posts 'id'=1, 'title'='Hello MySQL'
	// return result
};
connection.idFind=function(id) {
	let sql="select * from t_user where userid=?";
	let promise=new Promise((resolve,reject)=>{
		connection.query(sql,id, function (error, result,fields) {
			if(error){
				reject(error)
			};
			if(result){
				resolve(result,fields)
			}	
		});
	}).then((value)=>{
		return value
	});   
	console.log(promise)
	return promise
};

connection.inputF=function(){``
	console.log(this.friend)//问题所在
	return this.friend
};

//添加好友
connection.addfriend=function(sendid,receid,msg) {
    let post = {
       sendid,
	   receid,
	   msg,
	   sendtime:new Date(),
	   type:1
    };
    let query = connection.query("INSERT INTO t_friend SET ?", post, function (error, results, fields) {
        if (error) throw error;
		console.log('已发送申请')
    })
    console.log(query.sql); //INSERT INTO posts 'id'=1, 'title'='Hello MySQL'
};
//获得好友信息
connection.setfriend=function(id){
	let sql='select * from t_friend where (sendid = ? or receid =?) and type=2';
	let promise=new Promise((resolve,reject)=>{
		connection.query(sql, [id,id], function (error, result,fields) {
			if(error){
				reject(error)
			};
			resolve(result,fields)
		});
	})
	.then((res)=>{
		this.friends=res
		// console.log(this.friends)
	});	
	
}
connection.getfriend=function(){
	return this.friends
}
//通过好友申请
connection.agreen=function(sendid,receid){
	let sql='update t_friend set type=2 where (sendid =? and receid =?)'
	connection.query(sql, [sendid,receid], function (error, result,fields) {
			if(error) throw error			
			console.log(result,fields)
	});
	let post = {
	   sendid,
	   receid,
	   msg:'你好~',
	   msgtype:'0',
	   sendtime:new Date(),
	   type:0
	};
	let query = connection.query("INSERT INTO t_msg SET ?", post, function (error, results, fields) {
	    if (error) throw error;
	})
}
connection.refuse=function(sid,rid){
	let sql='delete from t_friend  where (sendid =? and receid =?)'
	connection.query(sql, [sid,rid], function (error, result,fields) {
			if(error) throw error			
			console.log(result,fields)
	});
}
//好友申请列表
connection.getapply=function(id){
	let sql='select * from t_friend where receid =? and type=1';
	let promise=new Promise((resolve,reject)=>{
		connection.query(sql, id, function (error, result,fields) {
			if(error){
				reject(error)
			};
			resolve(result,fields)
		});
	}).then((res)=>this.apply=res);
}
connection.friendQuest=function(){
	return this.apply
}

//获取所有人信息(除了自己)
connection.getAll=function(id){
	let sql='select * from t_user where userid != ?'
	let promise=new Promise((resolve,reject)=>{
		connection.query(sql, id, function (error, result,fields) {
			if(error){
				reject(error)
			};
			resolve(result,fields)
		});
	})
	.then((res)=>this.allother=res);
	return this.allother;
}
//添加聊天信息
connection.addmsg=function(sendid,receid,msg,msgtype) {
    let post = {
       sendid,
	   receid,
	   msg,
	   msgtype,
	   sendtime:new Date(),
	   type:0
    };
    let query = connection.query("INSERT INTO t_msg SET ?", post, function (error, results, fields) {
        if (error) throw error;
    })
    console.log(query.sql); //INSERT INTO posts 'id'=1, 'title'='Hello MySQL'
}

connection.qqquery = function( sql, values ) {
  // 返回一个 Promise
  return new Promise(( resolve, reject ) => {
    
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          // 结束会话
        
        })
      
    })
}


module.exports=connection
