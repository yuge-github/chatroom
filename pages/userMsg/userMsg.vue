<template>
	<view>
		<view class='top-bar'>
			<view class="top-bar-left">
				<text class="text" @click="backOne">返回</text>
			</view>
			<view class="top-bar-center" style="">
				<text class="text" style="">详情</text>
			</view>  
		</view>
		<view class="main">
			<view class="row heads">
				<view class="title">头像</view>
				<view class="cont">
					<image-cropper  :src="tempFilePath" @confirm="confirm" @cancel="cancel" ></image-cropper>
					<image :src="cropFilePath" @tap="upload"></image>
				</view>
				<view class="more">🖊</view>
			</view>
			<view class="row">
				<view class="title">签名</view>
				<view class="cont">{{ user.signature }}</view>
				<view class="more" @click="toggleSig">🖊</view>
			</view>
			<view class="row">
				<view class="title">注册</view>
				<view class="cont">{{user.loginT}}</view>
			</view>
			<view class="row">
				<view class="title">用户名</view>
				<view class="cont">{{ user.name }}</view>
				<view class="more" @click="toggleName">🖊</view>
			</view>
			<view class="row">
				<view class="title">生日</view>
				<view class="cont">
					<picker mode="date" :value="user.birthday"  @change="bindDateChange">
					    <view class="uni-input">{{user.birthday}}</view>
					</picker>
				</view>
				<view class="more">🖊</view>
			</view>			
			<view class="row">
				<view class="title">性别</view>
				<view class="cont">
					<picker @change="bindPickerChange" :value="user.gender" :range="gender">
						<view class="uni-input">{{gender[user.gender]}}</view>
					</picker>
				</view>
				<view class="more">🖊</view>
			</view>
			<view class="row">
				<view class="title">电话</view>
				<view class="cont">{{ user.phone }}</view>
				<view class="more" @click="togglePho">🖊</view>
			</view>
			<view class="row">
				<view class="title">邮箱</view>
				<view class="cont">{{ user.email }}</view>
				<view class="more" @click="toggleEmail">🖊</view>
			</view>
			<view class="row">
				<view class="title">密码</view>
				<view class="cont">******</view>
				<view class="more" @click="togglePsw">🖊</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="cancel" @click="logOff">退出登录</view>
		</view>
		<view class="modify" v-if="ifSig">
			<view class="modify-header">
				<view class="cancel" @click="toggleSig">取消</view>
				<view class="title">签名</view>
				<view class="define" @click="">确定</view>
			</view>
			<view class="signature-main">
				<textarea class="content" v-model="signature"></textarea>
			</view>
		</view>
		<view class="modify" v-if="ifName">
			<view class="modify-header">
				<!-- <view class="cancel" @click="toggleName">取消</view> -->
				<view class="center">姓名</view>
				<view class="define" @click="toggleName">确定</view>
			</view>
			<view class="name-main">
				<input class="content" v-model="name" />
			</view>
		</view>
		<view class="modify" v-if="ifPho">
			<view class="modify-header">
				<view class="cancel" @click="togglePho">取消</view>
				<view class="center">电话</view>
				<!-- <view class="define" @click="togglePho">确定</view> -->
			</view>
			<view class="name-main">
				<input class="content" v-model="oldPsw" placeholder="输入旧密码"/>
				<input class="content" v-model="newPho" type="number" placeholder="输入新电话"/>
				<button class="btn" @click="changePho">确认修改</button>
			</view>
		</view>
		<view class="modify" v-if="ifPsw">
			<view class="modify-header">
				<view class="cancel" @click="togglePsw" >取消</view>
				<view class="center">密码</view>
				<!-- <view class="define" @click="togglePsw">确定</view> -->
			</view>
			<view class="name-main">
				<input class="content" v-model="oldPsw" placeholder="输入旧密码"/>
				<input class="content" v-model="newPsw1" type="password" placeholder="输入新密码"/>
				<input class="content" v-model="newPsw2" type="password" placeholder="确认新密码"/>
				<button class="btn" @click="changePsw">确认修改</button>
			</view>
		</view>
		<view class="modify" v-if="ifEmail">
			<view class="modify-header">
				<view class="cancel" @click="toggleEmail">取消</view>
				<view class="center">邮箱</view>
				<!-- <view class="define" @click="toggleEmail">确定</view> -->
			</view>
			<view class="name-main">
				<input class="content" v-model="oldPsw" placeholder="输入旧密码"/>
				<input class="content" v-model="newEmail" placeholder="输入新邮箱"/>
				<button class="btn" @click="changeEmail">确认修改</button>
			</view>
		</view>
	</view>
</template>

<script>
	//导入图片裁剪组件
	import imageCropper from '../../components/ling-imgcropper/ling-imgcropper.vue'
	export default {
		data() {
			return {
				
				user:'',
				userImgurl:'',
				index:0,
				gender:['男','女'],
				ifSig:0,
				ifName:0,
				ifPho:0,
				ifEmail:0,
				ifPsw:0,
				oldPsw:'',
				newPsw1:'',
				newPsw2:'',
				newPho:'',
				newEmail:'',
				tempFilePath:'',
				cropFilePath:''
			}
		},
		components:{
			imageCropper
		},
		onReady:function(){
			this.getData()
			console.log(this.user)
		},
		methods: {
			getData:function(){
				this.user=JSON.parse(localStorage.getItem('user'))
				this.userImgurl='../../static/userImg/'+this.user.imgurl
				// console.log(this.user)
				// console.log(this.userImgurl)
				if(!this.user){
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
			//picker
			bindPickerChange: function(e) {
			    // console.log('picker发送选择改变，携带值为', e.target.value)
			    this.user.gender = e.target.value
			},
			bindTimeChange: function(e) {
			    this.time = e.target.value
			},
			bindDateChange: function(e) {
			    this.user.birthday = e.target.value
			},
			//返回上一页
			backOne:function(){
				uni.navigateTo({
					url:"../user/user"
				})
			},
				
			//修改信息
			
			
			changeEmail:function(){
				const emailrule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(this.user.password!==this.oldPsw){
					alert('密码错误')
				}else if(!emailrule.test(this.newEmail)) {
					alert('格式错误')
				}else{
					this.email=this.newEmail
					alert('修改成功')
					this.ifEmail=0
				}
				this.oldPsw=''
			},
			changePsw:function(){
				if(this.user.password===this.oldPsw && this.newPsw1==this.newPsw2){
					this.user.password=this.newPsw1
					alert('修改成功')
					this.ifPsw=0
				}else{
					alert('修改密码失败')
				}
				this.oldPsw=''	
			},
			changePho:function(){
				if(this.user.password!==this.oldPsw){
					alert('密码错误')
				}else if(!(/^1[3456789]\d{9}$/.test(this.newPho))){ 
					alert('格式错误')
				}else{
					this.user.phone=this.newPho
					alert('修改成功')
					this.ifPho=0
				}
				this.oldPsw=''				
			},
			//弹出修改窗口
			toggleSig:function(){
				this.ifSig=!this.ifSig
			},
			toggleName:function(){
				this.ifName=!this.ifName
			},
			toggleEmail:function(){
				this.ifEmail=!this.ifEmail
			},
			togglePho:function(){
				this.ifPho=!this.ifPho
			},
			togglePsw:function(){
				this.ifPsw=!this.ifPsw
			},
			
			//头像裁剪
			upload:function() {
			    uni.chooseImage({
			        count: 1, //默认9
			        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			        sourceType: ['album'], //从相册选择
			        success: (res) => {
			            this.tempFilePath = res.tempFilePaths.shift()
		            }
		        });
			},
			confirm:function(e) {
		        this.tempFilePath = ''
				this.cropFilePath = e.detail.tempFilePath
			},
			cancel:function() {
			    console.log('canceled')
			},
			logOff:function(){
				localStorage.clear()
				uni.navigateTo({
					url:'../signin/signin'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";
	
	.main{
		padding-top: 118rpx;
		.row{
			display: flex;
			
			padding-left: $uni-spacing-col-base;
			.title{
				flex: left;
				font-size: 34rpx;
				color: $uni-text-color;
				font-weight: 400;
				float: left;
				line-height: 92rpx;
				// border: 1px red solid;
				// width: 20%;
			}
			.cont{
				width: 60%;
				// border: 1px red solid;
				padding: 0 20rpx 0;
				flex: auto;
				font-size: 30rpx;
				line-height: 92rpx;
				color: #686868;
				image{
					top: 10rpx;
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
					
				}
				display:-webkit-box;
				-webkit-box-orient:vertical;   
				-webkit-line-clamp:1;   
				overflow:hidden; 
			}
			
			.more{
				// border: 1px red solid;
				flex:none;
				width: 60rpx;
				height: 60rpx;
				line-height: 92rpx;
				&:hover{
					color: #DD524D;
				}
			}
		}
	}
	.bottom-bar{
		padding-bottom: var(--status-bar-height);
		width: 100%;
		// border: 1px red solid;
		margin-top: 100rpx 0 200rpx 0;
		justify-content: center;
		align-content: center;
		text-align: center;
		bottom: 100rpx;
		.cancel{
			width: 30%;
			height: 80rpx;
			line-height: 80rpx;
			margin: 0 auto;
			border-radius: 40rpx;
			// border: 1px red solid;
			color: $uni-color-warning;
			
			&:hover{
				color: #4CD964;
			}
		}
		
	}
	.modify{
		position: absolute;
		z-index: 1002;
		bottom: 0;
		height: 98%;
		width: 100%;
		background-color: $uni-bg-color;
		border-radius: 50rpx 50rpx 0 0;
		border-top:5px #555555 solid ;
		.modify-header{
			padding:$uni-spacing-col-base;
			display: flex;
			flex-direction:row;
			// border: 1px red solid;
			.cancel{
				font-size: $uni-font-size-lg;
				line-height: 44rpx;
				&:hover{
					color: yellowgreen;
				}
			}
			.title{
				flex: auto;
				text-align: center;
				font-size: 40rpx;
				font-weight: 400;
				color: rgba(39,40,50,1);
				line-height: 88rpx;
			}
			.center{
				font-size: 40rpx;
				font-weight: 400;
				z-index: 0;
				position: absolute;
				// border: 1px red solid;
				margin: 0 auto;
				// text-align: center;
				left: 50%;
				transform: translateX(-50%);
				line-height: 88rpx;
			}
			.define{
				font-size: $uni-font-size-lg;
				line-height: 44rpx;
				&:hover{
					color: yellowgreen;
				}
			}
		}
		.signature-main{
			 padding-left: $uni-spacing-col-base;
			 // border: 1px red solid;
			 .content{
				 margin: 0 auto;
				 width: 80%;
				 padding: 20rpx;
				 border-radius: 20rpx;
				 background-color: #dadada;
			 }
		}
		.name-main{
			 padding-left: $uni-spacing-col-base;
			 // border: 1px red solid;
			 .content{
				 margin: 10rpx auto;
				 width: 80%;
				 padding: 20rpx;
				 border-radius: 20rpx;
				 background-color: #dadada;
			 }
			 .btn{
				 width: 50%;
				 margin:30rpx auto;
			 }
		}
	}
</style>
