<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<view class="submit-voice" @click="noAchieve" v-if="inputType">🔊</view>
				<view class="submit-voice" @click="toggleType" v-if="!inputType">🖊</view>
				<textarea class="input-area" auto-height="true" v-if="inputType"  @input='inputMsg' v-model="msg"></textarea>
				<view class="input-area voice-input" v-if='!inputType' @touchstart='startRecord' @touchend='endRecord'>
				<jc-record
				  voicePath=""
				  :maxTime="15"
				  :minTime="5"
				  @okClick="saveRecord"
				    @show="show"
				    @close="close"
				>
				    <view class="centerwz">录制语音</view>
				</jc-record>    </view>
				<view class="face" @click="toggleEmoji">😊</view>
				<view class="moreTap" @click="toggleExtra">+</view>
			</view>
			<view class="emoji" v-if="ifEmoji">
				<emoji @getEmoji="getEmoji" @submitMsg='inputMsg' @deleteMsg='deleteMsg'></emoji>
			</view>
			<view class="extra" v-if="ifExtra">
				<view class="more">
					<view class="more-list" @tap="sendImg('album')">
						<image src="../../static/logo.png"></image>
						<view class="more-list-title" >图片</view>
					</view>
					<view class="more-list" @tap="sendImg('camera')">
						<image src="../../static/logo.png"></image>
						<view class="more-list-title" >拍照</view>
					</view>
					<!-- <view class="more-list">
						<image src="../../static/logo.png"></image>
						<view class="more-list-title">文件</view>
					</view> -->
					<!-- <view class="more-list">
						<image src="../../static/logo.png"></image>
						<view class="more-list-title">定位</view>
					</view> -->
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import emoji from '../emoji/emoji.vue';
	import more from '../more/more.vue'
	const recorderManager = uni.getRecorderManager();
	export default {
		data() {
			return {
				user:'',
				friend:'',
				inputType:1,
				ifEmoji:0,
				ifExtra:0,
				msg:'',
				emoji:'',
				filePaths:[],
				voicePath: '',
				vlength:''
			}
		},
		created() {
			this.getData()
		},
		components:{
			emoji,more
		},
		methods: {
			getData:function(){
				// console.log(localStorage.getItem('friend'))
				this.friend=JSON.parse(localStorage.getItem('friend'))		
				this.friend.imgurl='../../static/userImg/'+this.friend.imgurl
				// console.log(this.friend)
				this.user=JSON.parse(localStorage.getItem('user'))
				this.user.imgurl='../../static/userImg/'+this.user.imgurl
				if(!this.user){
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
				this.$forceUpdate()
			},
			saveRecord(recordPath) {        
				console.log("===音频文件地址："+recordPath+"===")
				//do... 可以使用 uni.uploadFile 接口上传到服务器
			},
			
			startRecord:function() {
		        console.log('开始录音');
				let i=0
				this.timer=setInterval(()=>{
					i++
					console.log(i)
				},1000)
				console.log(recorderManager.__proto__)
				recorderManager.start()
				// recorderManager.start();
			},
			endRecord:function() {
			    console.log('录音结束');
				clearInterval(this.timer)
				recorderManager.stop();
				recorderManager.onStop(function(res){
					console.log(JSON.stringify(res))
					let data={
						voice:res.tempFilePaths,
						time:this.vlength
					}
					self.voicePath=res.tempFilePaths
				});
			},
			sendImg:function(e){
				let count=9;
				if(e=='album'){
					count=9
				}else{
					count=1
				}
				uni.chooseImage({
				    count: count, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: [e], //从相册选择
					success: (chooseImageRes) => {
				           const tempFilePaths = chooseImageRes.tempFilePaths;
						   for (let i=0;i<tempFilePaths.length;i++){
								const uploadTask = uni.uploadFile({
								   url: 'http://localhost:3000/file/chatImg', 
								   filePath: tempFilePaths[i],
								   name: 'file',
								   formData: {
										url:'chat',
										name:this.user.userid+'-'+i
								   },
								   success: (data) => {
									   let uid=this.user.userid
									   let fid=this.friend.userid
										this.submit(path,1)
										let path='http://localhost:3000/'+'chat/'+data.data
										this.socket.emit('sendmsg',data.data,uid,fid,1)
										this.$emit('getMsg')
								   }
							   });
							   uploadTask.onProgressUpdate((res) => {
								   console.log('上传进度' + res.progress);
								   console.log('已经上传的数据长度' + res.totalBytesSent);
								   console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					   
								   // 测试条件，取消上传任务。
								   // if (res.progress > 50) {
									  //  uploadTask.abort();
								   // }
							   });			   
						   }					   				           
				       }
					
				})				
			},
			
			toggleType:function(){
				if(this.inputType==1){
					this.ifEmoji=0;
					this.ifExtra=0;
				}
				this.inputType=!this.inputType; 		
			},
			toggleEmoji:function(){
				this.ifEmoji=!this.ifEmoji;
				this.ifExtra=0
				//异步获取改变后的高度
				setTimeout(()=> {
					this.getElementHeight();
				}, 0);
				
			},
			
			toggleExtra:function(){
				this.ifExtra=!this.ifExtra;
				this.ifEmoji=0
				setTimeout(()=> {
					this.getElementHeight();
				}, 0);
			},
			
			//空格输出字符串
			async inputMsg(){				
				let uid=this.user.userid
				let fid=this.friend.userid
				const chatMsg=this.msg
				// let str=JSON.stringify(chatMsg)		
				let post=chatMsg.indexOf('\n')
				if(chatMsg.length && post!=-1){
					await this.submit(chatMsg,0)				
					this.$emit('getMsg')
					//发送信息给后端
					this.socket.emit('sendmsg',chatMsg,uid,fid,0)
					this.msg=''				
				}				
			},
			getElementHeight:function(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('heights',data.height)
				}).exec();
			},
			//发送方法
			submit:function(msg,type){
				let sendtime=new Date();
				return new Promise((resolve,reject)=>{					
					uni.request({
						url:'http://localhost:3000/addMsg',
						data:{
							sendid:this.user.userid,
							receid:this.friend.userid,
							msg,
							msgtype:type,
							sendtime
						},
						method:"POST",
						success: (data) => {
							resolve(data)
						},
						fail:(err)=>{
							reject(err)
						},											
					})
				})
			},
			getEmoji(data){
				this.emoji=data
				this.msg=this.msg+this.emoji
			},
			deleteMsg:function(){
				 this.msg = this.msg.substring(0,this.msg.length - 2);
			},
			noAchieve:function(){
				alert('未开发')
			}
			
		}
	}
</script>

<style lang="scss">
	.submit{
		background-color: rgba(244,244,244,0.96);
		padding-top: 20rpx;
		// margin-bottom: 20rpx;
		border-top: 1px solid $uni-border-color;
		width: 100%;
		// height: 80rpx;
		position: fixed;
		bottom: 0rpx;
		z-index: 100;
		
		padding-bottom: var(--status-bar-height);
		.submit-chat{
			padding-left: $uni-spacing-col-base;
			width: 100%;
			display: flex;
			flex-direction: row;
			margin-bottom: 20rpx;
		}
		.submit-voice{
			width: 40rpx;
		}
		.input-area{
			font-size: 26rpx;
			width: 460rpx;
			margin: 0 20rpx;
			padding: 5rpx 20rpx;
			background-color: #e2e2e2;
			border-radius: 20rpx;
			line-height: 50rpx;
			max-height: 160rpx;
		}
		.face{
			&:hover{
				background-color: #e2e2e2;
			}
		}
		.moreTap{
			// border: 1rpx red solid;
			width: 50rpx;
			text-align: center;
			font-size: 50rpx;
			line-height: 50rpx;
			margin-left: 10rpx;
			&:hover{
				background-color: #e2e2e2;
			}
		}
		.voice-input{
			text-align: center;
		}
		.emoji{
			display: flex;
			margin-top: 10rpx;
			width: 100%;
			height: 100%;
			background-color: #e2e2e2;
			
		}
		.extra{
			display: flex;
			margin-top: 10rpx;
			width: 100%;
			height: 440rpx;
			background-color: #e2e2e2;
			text-align: center;

		}
	}
	.more{
		// border:1px blue solid;
		// display: flex;
		width: 100%;
		height: 436rpx;
		// background-color: rgba(233,233,233,1);
		bottom:env(safe-area-inset-bottom);
		padding:0 20rpx;
		box-sizing: border-box;
		.more-list{
			padding-top: 32rpx;
			width: 25%;
			// border:1rpx red solid;
			float: left;
			border-radius: 24rpx;
			// background-color: white;
			image{
				background-color: white;
				padding: 24rpx;
				border-radius: 24rpx;				
				width: 72rpx;
				height:72rpx;
			}
		}
		.more-list-title{
			font-size: 24rpx;
		}
	}
		
	
</style>
