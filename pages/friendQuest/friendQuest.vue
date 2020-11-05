<template>
	<view>
		<view class='top-bar'>
			<view class="top-bar-left">
				<text class="text" @click="backOne">返回</text>
			</view>
			<view class="top-bar-center">
					<text class="text">好友请求</text>
			</view>  
		</view>
		<view class="main">
			<view class="request" v-for="(item,index) in friends" :key='index'>
				<view class="refuse" @click="refuse(item)">拒绝</view>
				<view class="friendMsg">
					<image src="../../static/userImg/头像3.jpg" mode="aspectFill"></image>
					<view class="name">{{ item.name }}</view>
					<view class="time">{{ changeTime(item.sendtime) }}</view>
				</view>
				<view class="agreen" @click="agreen(item)">同意</view>
				<view class="msg">{{ item.msg }}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import myFunction from '../../commons/js/myFunction.js'
	export default {
		data() {
			return {
				user:'',
				friends:[]
			}
		},
		onReady:function(){
			this.setData()
			this.getData()
		},

		methods: {
			changeTime:function(date){
				return myFunction.dateTime(date)
				
			},
			setData:function(){
				this.user=JSON.parse(localStorage.getItem('user'))
				if(!this.user){
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
				uni.request({
					url:'http://localhost:3000/friendquest',
					data:{
						id:this.user.userid,
					},
					method:"POST",
					success: (data) => {
						console.log(data)
					},
					fail:(err)=>{
						console.log(err)
					},
				})
			},
			getData:function(){
				uni.request({
					url:'http://localhost:3000/getquest',
					data:{
						
					},
					method:"POST",
					success: (data) => {
						this.friends=data.data
					},
					fail:(err)=>{
						console.log(err)
					},
				})
			},
			backOne:function(){
				uni.navigateTo({
					url:'../index/index'
				})
			},
			agreen:function(e){
				let sid=e.sendid
				let rid=e.receid
				uni.request({
					url:'http://localhost:3000/agreen',
					data:{
						sid,
						rid,
					},
					method:"POST",
					success: (data) => {},
					fail:(err)=>{
						console.log(err)
					},
				})
				let index=this.friends.indexOf(e)
				this.friends.splice(index,1)
			},
			refuse:function(e){
				let sid=e.sendid
				let rid=e.receid
				uni.request({
					url:'http://localhost:3000/refuse',
					data:{
						sid,
						rid,
					},
					method:"POST",
					success: (data) => {},
					fail:(err)=>{
						console.log(err)
					},
				})
				let index=this.friends.indexOf(e)
				this.friends.splice(index,1)
			}
		}
	}
</script>

<style lang="scss">
@import '../../commons/css/mycss.scss';
.top-bar{
	background: rgba(255,255,255,0.96);
}
.main{
	padding: $uni-spacing-row-base $uni-spacing-col-base;
	margin-top: 60rpx;
	.request{
		margin-top: 80rpx;
		margin-bottom: 0rpx;
		height: 300rpx;
		display: flex;
		background-color: white;
		box-shadow: 0px 24px 64px -8px rgba(0,0,0,0.2);
		.refuse{
			font-weight: 500;
			font-size: 35rpx;
			margin-left: 30rpx;
			flex: none;
			text-align: center;
			line-height: 80rpx;
			width: 160rpx;
			height: 80rpx;
			color: red;
			background-color: #ffced9;
			margin-top: 30rpx;
			border-radius: 100rpx;
			// border:1px red solid;
			&:hover{
				background-color: #000000;
				color: #ffffff;
			}
		}
		.friendMsg{
			flex:auto;
			text-align: center;
			width: 40%;
			image{
				margin-top: -60rpx;
				border-radius: $uni-border-radius-circle;
				width: 120rpx;
				height: 120rpx;
			}
		}
		.agreen{
			font-weight: 500;
			font-size: 35rpx;
			background-color:#ffff00;
			height: 80rpx;
			line-height: 80rpx;
			// padding-top: 30rpx;
			width: 160rpx;
			text-align: center;
			margin-top: 30rpx;
			margin-right: 30rpx;
			border-radius: 100rpx;
			&:hover{
				background-color: yellowgreen;
				color: #ffffff;
			}
		}
		.time{
			font-size: $uni-font-size-base;
		}
		.msg{
			height: 100rpx;
			width:560rpx;
			border-radius: 30rpx;
			padding: 10rpx;
			font-size: $uni-font-size-base;
			position: absolute;
			margin-top: 160rpx;
			left: 50%;
			transform:translateX(-50%) ;
			// border: 1px red solid;
			background-color: #dfdfdf;
		}
		.name{
			font-size: 35rpx;
		}
	}
}
</style>
