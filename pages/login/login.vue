<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @click="toSignin">
					<view class="text">返回</view>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/img/CHAT.png"></image>
		</view>
		<view class="main">
			<view class="title">注册</view>
			<view class="slogan">欢迎来到 CHAT</view>
			<view class="input">
				<view class="input-div">
					<input type="text" placeholder="用户名" class="user" @input="getUser" />
					<view class="occupy" v-if="uOccupy">已占用</view>
					<view class="ok" v-if="isuser">✔</view>
				</view>
				<view class="input-div">
					<input type="text" placeholder="邮箱" class="user" @blur="isEmail"/>
					<view class="occupy" v-if="eOccupy">已占用</view>
					<view class="invalid" v-if="invalid">无效的邮箱</view>
					<view class="ok" v-if="isemail">✔</view>
				</view>
				<view class="input-div">
					<!-- type前面加: 号，表示与下面变量关联 -->
					<input :type='type' placeholder="密码" class="psw" @input='getPsw'/>
					<image src="../../static/img/visible.png" class="visible" v-if="isvis" @click="visible"></image>
					<image src="../../static/img/unvisible.png" class="unvisible" v-if="!isvis" @click="visible" ></image>
				</view>
				
			</view>
		</view>
		<view :class='[{submit:isok},{unSubmit:!isok}]' @click="loginUser" >注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:'',
				email:'',
				password:'',
				type:'password',
				isuser:0,
				isemail:0,
				isvis:0,//密码可视
				invalid:0,//邮箱无效
				uOccupy:0,//用户占用
				eOccupy:0,//邮箱占用
				isok:false,
			}
		},
		computed:{
			userData:function(){
				return {user:this.user,email:this.email,password:this.password}
			}
		},
		methods: {
			visible:function(){
				if(this.isvis){
					this.type='password'
					this.isvis=!this.isvis
				}else{
					this.type='text'
					this.isvis=!this.isvis
				}
			},
			//判断邮箱格式
			isEmail:function(e){
				//获取输入值
				this.email=e.detail.value
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(this.email.length>0){
					if(reg.test(this.email)){
						this.invalid=0;
					}else{
						this.invalid=1;
					}
				}
				this.isSubmit()
			},
			getUser:function(e){
				this.user=e.detail.value
				this.isSubmit()
			},
			getPsw:function(e){
				this.password=e.detail.value
				this.isSubmit()
			},
			isSubmit:function(){
				if(this.user && !this.invalid && this.password.length>5){
					this.isok=1
				}else{
					this.isok=0
				}
			},
			loginUser:function(){
				// if(this.isok){
					uni.request({
						url:'http://localhost:3000/login',
						data:{
							user:this.user,
							email:this.email,
							password:this.password
						},
						method:'GET',
						success: (data) => {
							console.log(data)
						}
					})
				// }
			},
			
			//跳转到登录界面
			toSignin:function(){
				uni.navigateTo({
					url:'../signin/signin'
				})
			},
			
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
		padding: 10rpx $uni-spacing-row-lg 70rpx;
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
		.input-div{
			position: relative;
		}
		.occupy,.invalid,.ok{
			position: absolute;
			top:0;
			right: 0;
			float: right;
			font-size: $uni-font-size-base;
			font-weight: 500;
			color: $uni-color-warning;
			line-height: 80rpx;
		}
		.ok{
			position: absolute;
			right: 0;
			float: right;
			font-size: $uni-font-size-base;
			font-weight: 500;
			color: $uni-color-success;
			line-height: 80rpx;
		}
		.visible,.unvisible{
			position: absolute;
			top:20rpx;
			right: 0;
			width: 50rpx;
			height: 50rpx;
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
		background: $uni-color-success;
		&:hover{
			color: $uni-bg-color-hover;
		}
		margin: 0 auto;
	}
	.unSubmit{
		// background-color: #F0AD4E;
		width: 300rpx;
		height: 80rpx;
		text-align: center;
		border-radius:$uni-border-radius-circle;
		font-weight: 500;
		line-height: 80rpx;
		font-size: $uni-font-size-lg;
		background:#888888;
		margin: 0 auto;
	}
	
</style>
