<template>
	<view class="content">
		<view class='top-bar'>
			<view class="top-bar-left">
				<navigator url="../user/user">
					<image :src='userImgurl' mode="aspectFill"></image>
				</navigator>
			</view>	
			<view class="top-bar-center">
				<image src="../../static/img/CHAT.png" class="logo"></image>
			</view>
			<view class="top-bar-right">
				<navigator url="../search/search" >
					<view class="search"><image src="../../static/img/搜索.png" mode=""></image></view>
				</navigator>
				<view class="add"><image src="../../static/img/添加.png" mode=""></image></view>
			</view>  
		</view>
		<view class="main">
				<view class="apply"></view>
				<view class="friends" @click="toQuest">
					<view class="friend-list">
						<view class="friend-list-l">
							<text class="tip">1</text>
							<image src="../../static/img/add.png"></image>
						</view>
						<view class="friend-list-r">
							<view class="top">
								<view class="name" style="color:yellowgreen">好友申请</view>
								<view class="time">13:45</view>
							</view>
							<view class="news"> 
								网络一线牵，珍惜这段缘
							</view>
						</view>
					</view>
				</view>
				<view class="friends">
				<view class="friend-list" v-for="(item,index) in ffriends" :key='index' >
					<view class="friend-list-l">
						<text class="tip" v-if="item.tip">{{ item.tip }}</text>
						<image :src='item.imgurl' @click="setfriend(item)"></image>
					</view>
					<view class="friend-list-r" @click="toChat(item)">
						<view class="top">
							<view class="name">{{ item.name }}</view>
							<view class="time">{{ changeTime(item.sendtime) }}</view>
						</view>
						<view class="news"> 
							{{ item.msg }}
						</view>
					</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
import Bus from '../../config/bus.js';
import datas from '../../commons/js/datas.js';
import myFunction from '../../commons/js/myFunction.js';
import store from '../../store/index.js';
	export default{
		data() {
			return {
				id:'',
				friend:'',
				friends:[],
				ffriends:[],
				user:'',
				userImgurl:'',
				msglist:[],
				fflength:0
			}
		},
		
		filters:{
			
		},
		created(){		
			this.getData()
			this.getMsg()			
			this.signin()
			this.iosignin()
		},
		methods: {
			changeTime:function(date){
				return myFunction.dateTime(date)	
			},
			getData(){
				// console.log(0)
				this.user = JSON.parse(localStorage.getItem('user'))
				this.userImgurl='../../static/userImg/'+this.user.imgurl
				if (!this.user) {
					uni.navigateTo({
						url: '../signin/signin'
					})
				}
			},
			getfriendPromise(url){
				return new Promise((resolve, reject) => {
					uni.request({
						url,
						data:{
							id:this.user.userid,
						},
						method:"POST",
						success: (data) => {
							// console.log(data)
							this.friends=JSON.parse(JSON.stringify(data.data))					
							// console.log(this.friends)
							resolve(data)
						},
						fail:(err)=>{
							reject(err)
						},
					})
				})
			},
			idfindPromise(url){
				return new Promise((resolve,reject)=>{
					uni.request({
						url:url,
						data:{
							id:this.id
						},
						method:"POST",
						success: (data) => {
							// console.log(data)
							let a=data.data[0]
							a.imgurl='../../static/userImg/'+a.imgurl
							this.ffriends.push(a)
							this.fflength=this.ffriends.length									
							resolve(data)
						},
						fail:(err)=>{
							console.log(err)
							reject(err)
						},											
					})
				})
			},
			//socket模块，提示服务端已登录
			signin:function(){
				let uid=this.user.userid
				this.socket.emit('signin',uid)
			},
			iosignin:function(){
				this.socket.on('iosignin',(id)=>{
					console.log('后端：'+id)
				})
			},
			
			async getfriend(){				
				// console.log(1)
				await this.getfriendPromise('http://localhost:3000/getfriend')
				// console.log(1)
			},
			async idfind(){
				await this.getfriend()				
				// console.log(2)
				let uid=this.user.userid
				for(let i=0;i<this.friends.length;i++){
					// console.log(this.friends[i])
					if(uid==this.friends[i].receid){
						this.id=this.friends[i].sendid
					}else{
						this.id=this.friends[i].receid	
					}								
					
					await this.idfindPromise('http://localhost:3000/idfind')					
				}
				// console.log(2)
			},
			async getMsg(){
				await this.idfind()	
				// console.log(3)			
				uni.request({
					url:'http://localhost:3000/idfindmsg',
					data:{
						id:this.user.userid,
					},
					method:"POST",
					success: (data) => {
						let msglist=data.data	
						for(let i=0;i<msglist.length;i++){
							
							let msid=msglist[i].sendid
							let mrid=msglist[i].receid
							let msg=msglist[i].msg
							let msgtype=msglist[i].msgtype
							let sendtime=msglist[i].sendtime
							for(let j=0;j<this.fflength;j++){
								let fsid=this.ffriends[j].userid
								let frid=this.user.userid
								// console.log(fsid,frid)
								if(( msid==fsid && mrid==frid ) || ( msid==frid && mrid==fsid )){	
									this.ffriends[j].sendtime=sendtime
									if(msgtype==0){
										this.ffriends[j].msg=msg
										// console.log(this.ffriends[j])
									}else if(msgtype==1){
										this.ffriends[j].msg='[图片]'
									}else{
										this.ffriends[j].msg='[视频]'
									}
									
								}
							}
							// console.log(this.ffriends)
						}	
						this.$forceUpdate()
					},
					fail:(err)=>{
						console.log(err)
					},	
				})
			},
			setfriend:function(e){
				localStorage.setItem('friend',JSON.stringify(e))
				uni.navigateTo({
					url:'../friend/friend'
				})
				// console.log(e)
			},
			toChat:function(e){
				localStorage.setItem('friend',JSON.stringify(e))
				uni.navigateTo({
					url:"../chat/chat"
				})
			},
			toQuest:function(){
				uni.navigateTo({
					url:'../friendQuest/friendQuest'
				})
			}
				// for(let i=0;i<this.friends.length;i++){
					// this.friends[i].imgurl='../../static/userImg/'+this.friends[i].imgurl;
				// }				
				
			
		}
	}
</script>

<style lang="scss">
	@import '../../commons/css/mycss.scss';
	.content {
		padding-bottom: $uni-spacing-row-base;
	}
	.top-bar{
		background:rgba(255,255,255,0.96);
		border-bottom: 1px $uni-border-color solid;
	}
	.main{
		padding-top: 88rpx;
		// border:1px red solid;
	}
	.friend-list{
		
		&:active{
			background-color: $uni-bg-color-grey;
		}
		height: 96rpx;
		padding: 16rpx $uni-spacing-col-base 0;
		.friend-list-l{
			position: relative;
			float: left;
			image{
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
				background-color: $uni-bg-color;
			}
		}
		.tip{
			position: absolute; 
			z-index: 10;
			top: -6rpx;
			left: 68rpx;
			min-width: 36rpx;
			height:36rpx;
			background: $uni-color-warning;
			border-radius: $uni-border-radius-circle;
			color: $uni-text-color-inverse;
			font-size: $uni-font-size-sm;
			text-align: center;
			line-height: 36rpx;
		}
		.friend-list-r{
			padding-left: 128rpx;
			.top{
				height: 50rpx;
				.name{
					float: left;
					font-size: 36rpx;
					font-weight:400;
					color:$uni-text-color;
					line-height: 50rpx;
				}
				.time{
					font-size: $uni-font-size-sm;
					float: right;
					color:$uni-text-color-disable;
					line-height: 50rpx;
				}
			}
			.news{
				font-size: $uni-font-size-base;
				color:$uni-text-color-grey;
				line-height: 40rpx;
				//控制单行
				display:-webkit-box;   
				-webkit-box-orient:vertical;   
				-webkit-line-clamp:1;   
				overflow:hidden; 
			}
		}
	}
</style>
