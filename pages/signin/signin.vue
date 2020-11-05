<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-right" @click="toLogin">
					<view class="text">注册</view>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/img/CHAT.png"></image>
		</view>
		<view class="main">
			<view class="title">登录</view>
			<view class="slogan">欢迎来到 CHAT</view>
			<view class="input">
				<input type="text" placeholder="用户名/邮箱" v-model="name"/>
				<input type="password" placeholder="密码" v-model="psw"/>
				<view class="tip" v-if="isErr">输入用户或密码错误!</view>
			</view>
		</view>
		<view class="submit" @click="getData">登录</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				id:'',
				friend:'',
				friends:[],
				ffriends:[],
				userImgurl:[],
				name:'',
				psw:'',
				isErr:0,
				user:'',
				reqMsg:''
			}
		},
		methods: {	
			testFun:function(){			
				//连接后台测试
				uni.request({
					url:'http://localhost:3000/test',
					data:{
						name:this.name,
						password:this.psw,
					},
					method:"POST",
					success: (data) => {
						// this.user=JSON.stringify(data.data[0]);
						// console.log(dat	a)
						this.user=data.data[0];
						if(this.user){
							localStorage.setItem('user',JSON.stringify(this.user))
							uni.navigateTo({
								url: '/pages/index/index',
							});			
						}else{
							this.isErr=1
						}
						// this.reqMsg=this.user.name;
						
					},
					fail:(err)=>{
						console.log(err)
					},
				});
				// console.log(this.user)//这里是空数组
			},
			getData:function(){
				if(this.name && this.psw){
					let user={name:this.name,psw:this.psw}
					this.testFun()
				}else if(!this.name){
					alert('用户名/邮箱不能为空')
				}else{
					alert('密码不能为空')
				}
				
			},	
			
			//跳转到注册界面
			toLogin:function(){
				uni.navigateTo({
					url:'../login/login',
				})
			},
			//
		}
	}
</script>

<style lang="scss">
	@import '../../commons/css/mycss.scss';	
	.logo {
		text-align: center;
		image{
			height: 290rpx;
			width: 380rpx;
			margin: 0 auto;
			padding-top: 130rpx;
		}
	}
	.main{
		padding: 20rpx $uni-spacing-row-lg 70rpx;
		width: 100%;
		.title{
			font-size: 56rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 80rpx;
		}
		.slogan{
			font-size: 40rpx;
			color: $uni-text-color-grey;
			line-height: 56rpx;
		}
		.input{
			padding-top: 20rpx;
			width: 85%;
			input{
				height: 80rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 80rpx;
				border-bottom: 1px solid $uni-border-color;
			}
		}
		.tip{
			color: $uni-color-warning;
			font-size: $uni-font-size-lg;
			float: left;
			line-height: 56rpx;
		}
	}	
	.submit{
		// background-color: #F0AD4E;
		width: 300rpx;
		height: 80rpx;
		text-align: center;
		border-radius:$uni-border-radius-circle;
		font-weight: 500;
		line-height: 80rpx;
		font-size: $uni-font-size-lg;
		background: $uni-color-primary;
		&:hover{
			color: $uni-bg-color-hover;
		}
		margin: 0 auto;
	}
</style>
