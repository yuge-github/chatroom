export default{
	friends: function(){
		let friendarr=[
			{
				id:1,
				imgurl:'头像1.jpg',
				tip:2,
				name:'Tom',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗',
			},
			{
				id:2,
				imgurl:'头像3.jpg',
				tip:4,
				name:'路人甲',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗'
			},
			{
				id:3,
				imgurl:'头像4.jpg',
				tip:0,
				name:'路人乙',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗'
			},
			{
				id:4,
				imgurl:'头像2.jpg',
				tip:2,
				name:'Tom',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗'
			},
			{
				id:5,
				imgurl:'头像3.jpg',
				tip:4,
				name:'路人甲',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗'
			},
			{
				id:6,
				imgurl:'头像4.jpg',
				tip:0,
				name:'路人乙',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗'
			},
			{
				id:7,
				imgurl:'头像2.jpg',
				tip:2,
				name:'Tom',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗'
			},
			{
				id:8,
				imgurl:'头像3.jpg',
				tip:4,
				name:'路人甲',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗'
			},
			{
				id:9,
				imgurl:'头像4.jpg',
				tip:0,
				name:'路人乙',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗'
			},
			{
				id:10,
				imgurl:'头像2.jpg',
				tip:2,
				name:'Tom',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗'
			},
			{
				id:11,
				imgurl:'头像3.jpg',
				tip:4,
				name:'路人甲',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗'
			},
			{
				id:12,
				imgurl:'头像4.jpg',
				tip:0,
				name:'路人乙',
				time:new Date(),
				email:'###',
				news:'你有看到杰瑞吗你有看到杰瑞吗你有看到杰瑞吗'
			},
		];
		return friendarr
	},
	ifFriend:function(){
		let isfriend=[
			{
				userid:1,
				friend:4,
			},
			{
				userid:2,
				friend:9
			},
			{
				userid:3,
				friend:2
			}
		];
		return isfriend;
	},
	reqFriends:function(){
		let reqfri=[
			{
				name:'渔歌',
				time:'2020-03-11',
				reqMsg:'你说你妈呢'
			},
			{
				name:'潮州知名靓仔',
				time:'2020-11-21',
				reqMsg:''
			},			
		]
		return reqfri
	},
	getMsg:function(){
		let message=[
			// {
			// 	id:1,
			// 	imgurl:'头像1.jpg',
			// 	message:{
			// 		voice:'a',
			// 		time:9
			// 	},
			// 	types:2,   //类型：0.文字 1.图像 3.音频 
			// 	time:new Date(), //发生时间
			// 	tip:9
			// },
			// {
			// 	id:0,
			// 	imgurl:'头像2.jpg',
			// 	message:{
			// 		voice:'a',
			// 		time:6
			// 	},
			// 	types:2,   //类型：0.文字 1.图像 3.音频 
			// 	time:new Date(), //发生时间
			// 	tip:8
			// },
			{
				id:1,
				imgurl:'头像1.jpg',
				message:'渔歌好帅我好爱',
				types:0,   //类型：0.文字 1.图像 3.音频 
				time:new Date(), //发生时间
				tip:7
			},
			{
				id:0,
				imgurl:'头像1.jpg',
				message:'渔歌好帅我好爱',
				types:0,
				time:new Date()-1000*60,
				tip:6
			},
			{
				id:1,
				imgurl:'头像1.jpg',
				message:'渔歌好帅我好爱',
				types:0,
				time:new Date()-1000*16*60,
				tip:5
			},
			{
				id:0,
				imgurl:'头像1.jpg',
				message:'add.png',
				types:1,
				time:new Date()-1000*60*60,
				tip:4
			},
			{
				id:0,
				imgurl:'头像1.jpg',
				message:'渔歌好帅我好爱,都不啊恶虎我电话',
				types:0,
				time:new Date()-1000*60*60,
				tip:3
			},
			{
				id:0,
				imgurl:'头像1.jpg',
				message:'visible.png',
				types:1,
				time:new Date()-1000*60*60*10,
				tip:2
			},
			{
				id:0,
				imgurl:'头像1.jpg',
				message:'visible.png',
				types:1,
				time:new Date()-1000*60*60*10,
				tip:1
			},
			{
				id:0,
				imgurl:'头像1.jpg',
				message:'visible.png',
				types:1,
				time:new Date()-1000*60*60*10,
				tip:0
			},
		]
		return message
	},
	
	
}