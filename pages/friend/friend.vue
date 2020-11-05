<template>
	<view>
		<view class='top-bar'>
			<view class="top-bar-left">
				<text class="text" @click="backOne">返回</text>
			</view>
			<view class="top-bar-right">
						
			</view>  
		</view>
		<view class="bg">
			<view class="bg-white"></view>
			<image src="../../static/userImg/头像1.jpg" class="bg-img" mode="aspectFill"></image>
		</view>
		<view class="main">
			<view class="user-head">
				<view >
					<text class="gender male" :animation='animationData3'>♂</text>
					<text class="gender female" :animation='animationData3'>♀</text>
				</view>
				<image src="../../static/userImg/头像1.jpg" mode="aspectFill" :animation="animationData4" ></image>
			</view>
			<view class="user-content">
				<view class="name"> {{ friend.name }} </view>
				<view class="email"> {{ friend.email }} </view>
				<view class="signature"> {{ friend.signature }} </view>
			</view>
		</view>
		<view class="bottom-bar" v-if="isfriend==2">
			<navigator url="../chat/chat">
				<view class="bottom-btn bb-send">发送信息</view>
			</navigator>	
		</view>
		<view class="bottom-bar" v-if="isfriend==1">
			<view class="bottom-btn bb-apply">申请中</view>
		</view>
		<view class="bottom-bar" v-if="isfriend==0">
			<view class="bottom-btn bb-add" @click="addFriendAnimation">加为好友</view>
		</view>
		<view class="add-bar" :style="{height:addHeight+'px',bottom:-addHeight+'px'}" :animation='animationData1'>
			<view class="name">{{ friend.name }}</view>
			<textarea class="add-msg"  maxlength="30" v-model="msg"></textarea>		
		</view>
		<view class="add-btn" :animation='animationData2'>
			<view class="cancel" @click="addFriendAnimation">取消</view>
			<view class="send" @click="sendapply">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isfriend:0,
				user:'',
				friend:'',
				msg:'',
				addHeight:0,
				animationData1:'',
				animationData2:'',
				animationData3:'',
				animationData4:'',				
			}
		},
		created() {
			this.getData()			
		},
		onReady() {
			this.getElementData()
		},
		methods: {
			backOne:function(){
				uni.navigateBack({
					delta:1
				})
			},
			getData:function(){
				// console.log(localStorage.getItem('friend'))
				this.friend=JSON.parse(localStorage.getItem('friend'))
				this.$forceUpdate()
				console.log(this.friend)
				// console.log(this.friend)
				this.user=JSON.parse(localStorage.getItem('user'))
				console.log(this.user)
				if(!this.user){
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
				this.msg=this.user.name+'请求加你为好友~'
				uni.request({
					url:'http://localhost:3000/getfriendtype',
						data:{
							sendid:this.user.userid,
							receid:this.friend.userid,							
						},
						method:"POST",
						success: (data) => {
							// this.user=JSON.stringify(data.data[0]);
							console.log(data)
							let dd=data.data[0]
							this.isfriend=dd.type
						},
						fail:(err)=>{
							console.log(err)
						},
				})
			},
			//获取页面高度
			getElementData:function(){
				const query = uni.createSelectorQuery().in(this);
				console.log(query)
				query.select('.bg').boundingClientRect((data) => {
				  // console.log("得到布局位置信息" + JSON.stringify(data));
				  // console.log("节点离页面顶部的距离为" + data.top);
				  this.addHeight=data.height-180;
				}).exec();
			},
			sendapply:function(){
				uni.request({
					url:'http://localhost:3000/apply',
						data:{
							sendid:this.user.userid,
							receid:this.friend.userid,
							msg:this.msg
						},
						method:"POST",
						success: (data) => {
							// this.user=JSON.stringify(data.data[0]);
							console.log(data)
							this.friends=data.data
						},
						fail:(err)=>{
							console.log(err)
						},
				})
			},
			//添加好友动画
			addFriendAnimation:function(){
				this.isAdd=!this.isAdd;
				var animation1 = uni.createAnimation({
				      duration: 600,
				      timingFunction: 'ease',
				})
				var animation2 = uni.createAnimation({
				      duration: 900,
				      timingFunction: 'ease',
			 	});
				var animation3 = uni.createAnimation({
				      duration: 600,
				      timingFunction: 'ease',
					  
				});
				var animation4 = uni.createAnimation({
				      duration: 600,
				      timingFunction: 'ease',
				});
				if(this.isAdd){
					 animation1.bottom(0).step()
					 animation2.bottom(0).step()
					 animation3.opacity(0).step()
					 animation4.width(110).height(110).top(50).step()
				}else{
					animation1.bottom(-this.addHeight).step()
					animation2.bottom(-102).step()
					animation3.opacity(1).step()
					animation4.width(200).height(200).top(0).step()
				}
				this.animationData1 = animation1.export()
				this.animationData2 = animation2.export()
				this.animationData3 = animation3.export()
				this.animationData4 = animation4.export()
			}
				
		}
	}
</script>

<style lang="scss">
	@import '../../commons/css/mycss.scss';		
	.bg{
		z-index: -1;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.bg-white{
			width: 100%;
			height: 100%;
			background-color: #eee;
		}
		.bg-img{
			opacity: 0.6;
			position: absolute;
			filter:blur(12px);
			left: -55rpx;
			top: -20rpx;
			width: 110%;
			height: 110%;
		}
	}
	.main{
		text-align: center;
		padding-top: 148rpx;
		.user-head{
			margin: 0 auto;
			position: relative;
			width: 424rpx;
			height: 424rpx;
			// border: 1px red solid;
			.gender{
				z-index: 15;
				position: absolute;
				bottom: 18rpx;
				right: 18rpx;
				width: 60rpx;
				height: 60rpx;
				line-height: 50rpx;
				
				border-radius: $uni-border-radius-circle;
			}
			.male{
				color:yellow;
				background-color: #178fff;
			}
			.female{
				color: #ff007f;
				background-color: #ffb2b3;
			}
			image{
				z-index: 10;
				top: 0;
				width: 400rpx;
				height: 400rpx;
				border-radius: 48rpx;
				border: #FFFFCA 6px solid;
			}
			
		}
		.user-content{
			padding-top: 42rpx;
			
			.name{
				font-size: 52rpx;
				color: $uni-text-color;
				line-height: 74rpx;
			}
			.email{
				font-size: $uni-font-size-lg;
				color: #6f2fb9;
				line-height: 40rpx;
			}
			.signature{
				margin: 0 auto;
				padding-top: 20rpx;
				font-family: PingFangSC-Light,PingFang SC;
				font-size: 33rpx;
				font-weight:300;
				width: 550rpx;
				height: 170rpx;
				color: rgba(60,40,50,1);
				line-height: 48rpx;
			}
		}
	}
	.bottom-bar{
		padding-bottom: var(--status-bar-height);
		position: fixed;
		width: 100%;
		height: 104rpx;
		bottom: 40rpx;
		// background-color: #eee;
		.bottom-btn{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			width: 300rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			border-radius: $uni-border-radius-lg;
		}
		.bb-add{
			background-color: yellow;
		}
		.bb-send{
			background-color: yellowgreen;
		}
		.bb-apply{
			background-color: #999999;
		}
	}
	.add-bar{
		bottom: 0;
		position: fixed;
		background-color:rgba(255,255,255,1);
		width: 100%;
		border-radius: 50rpx 50rpx 0 0;
		
		.name{
			padding-top: 120rpx;
			padding-left: $uni-spacing-col-lg;
			font-size: 52rpx;
			color: rgba(39,40,50,1);
			line-height: 74rpx;
		}
		.add-msg{
			box-sizing: border-box;
			padding: 18rpx 22rpx;
			margin: 0 auto;
			width: 90%;
			height: 45%;
			background-color: rgba($color: #DDDDDD, $alpha: 1.0);
			border-radius: 20rpx;
		}
	}
	.add-btn{
		display: flex;
		bottom: -122rpx;
		position: fixed;		
		width: 100%;
		height: 122rpx;
		// background-color: white;
		margin: 0 auto;
		// border: 1px red solid;
		justify-content: center;
		.cancel{
			// float: 
			left: 0;
			right: 0;
			top: 0;
			bottom:0;
			margin-right: 10rpx;
			width: 200rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			border-radius: $uni-border-radius-lg;
			background-color: #9298a1;
		}
		.send{
			// float: center;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			width: 400rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			border-radius: $uni-border-radius-lg;
			background-color: yellow;
		}
	}
	
</style>
