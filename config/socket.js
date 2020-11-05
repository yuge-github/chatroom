module.exports=function(io){
	io.on('connection',(socket)=>{
		var user={}
		console.log('连接成功')
		
		//用户登录成功
		socket.on('signin',(id)=>{
			// console.log(id)
			socket.emit('iosignin',socket.id)
			socket.name=id
			user[id]=socket.id
			console.log(user)
		});
		
		//发送消息
		socket.on('sendmsg',(msg,uid,fid,type)=>{
			console.log(msg)
			socket.broadcast.emit('getMsg',msg)
		})
		
		
		//用户退出
		socket.on('disconnecting', () => {
		  
			if(user.hasOwnProperty(socket.name)){
					delete user[socket.name]
					console.log(user)
			}
			console.log(socket.id+'离开')
		    // the rooms array contains at least the socket ID
		});
	})
}