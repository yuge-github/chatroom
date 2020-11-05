<template>
	<view>
		<view class='top-bar'>
			<view class="top-bar-left">
				<text class="text" @click="backOne">返回</text>
			</view>
			<view class="top-bar-right">
				<navigator url="../userMsg/userMsg">
					<text class="text" style="font-weight: 800;" @click="">· · ·</text>
				</navigator>		
			</view>  
		</view>
		<view class="bg">
			<view class="bg-white"></view>
			<image :src='userImgurl' class="bg-img" mode="aspectFill"></image>
		</view>
		<view class="main">
			<view class="user-head">
				<view >
					<text class="gender male" >♂</text>
					<text class="gender female" >♀</text>
				</view>
				<image :src='userImgurl' mode="aspectFill"  ></image>
			</view>
			<view class="user-content">
				<view class="name"> {{ user.name }} </view>
				<view class="email"> {{ user.email }} </view>
				<view class="signature"> {{ user.signature }} </view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:'',
				userImgurl:'',
				addHeight:0,
			}
		},
		onReady:function(){
			this.getData()
			this.getElementData()
		},
		methods: {
			backOne:function(){
				uni.navigateTo({
					url:'../index/index'
				});
			},
			getData:function(){
				this.user=JSON.parse(localStorage.getItem('user'))
				if(!this.user){
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
				this.userImgurl='../../static/userImg/'+this.user.imgurl
				// console.log(this.user)
				// console.log(this.userImgurl)
				if(!this.user){
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
			//获取页面高度
			getElementData:function(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => {
				  // console.log("得到布局位置信息" + JSON.stringify(data));
				  // console.log("节点离页面顶部的距离为" + data.top);
				  this.addHeight=data.height-180;
				}).exec();
			},
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
			background-color: yellow;
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
