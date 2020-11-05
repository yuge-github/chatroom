<template>
	<view>
		<view class='top-bar'>
			<view class="top-bar-left">
				<text class="text" @click="backOne">返回</text>
			</view>
			<view class="top-bar-center">
				<text class="text">{{friend.name}}</text>
			</view>  
			<view class="top-bar-right">
				<navigator url="../userMsg/userMsg">
					<text class="text" style="font-weight: 800;">· · ·</text>
				</navigator>
			</view>
		</view>
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :scroll-into-view="toView" :style="{height:chatHeight+'px'}">
			<view class="chat-main" :style="{paddingBottom:inputh+'px'}">
				<view class="chat-list" v-for="(item,index) in msg" :key='index' :id="item.tip">
					<view class="chat-time" v-if="item.time!=''">{{ changeTime(item.sendtime) }}</view>
					<view class="chat-msg msg-left" v-if="item.sendid!=user.userid">
						<image :src="friend.imgurl" mode="" class="chat-img"></image>
						<view class="massage">
							<view class="msg-text" v-if="item.msgtype==0">{{ item.msg }}</view>
							<view class="msg-img" v-if="item.msgtype==1">
								<image :src="item.msg" mode="" @click="priviewImg(item.msg)"></image>
							</view>
							<view class="voice-box" v-if="item.msgtype==2">
								<view class="msg-text">
									<view class="voice-time"> {{ item.message.time }}"</view>
									<view class="voice-img" :style="{width:item.message.time*8+'px'}">🔈 </view>
								</view>
							</view>
						</view>
					</view>
					<view class="chat-msg msg-right" v-if="item.sendid==user.userid">
						<image :src="user.imgurl" mode="" class="chat-img"></image>
						<view class="massage">
							<view class="msg-text" v-if="item.msgtype==0">{{ item.msg }}</view>
							<view class="msg-img" v-if="item.msgtype==1">
								<image :src="item.msg" mode="" @click="priviewImg(item.msg)"></image>
							</view>
							<view class="voice-box" v-if="item.msgtype==2">
								<view class="msg-text">
									<view class="voice-time"> {{ item.message.time }}"</view>
									<view class="voice-img" :style="{width:item.message.time*8+'px'}">🔈 </view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<submit @getMsg='updateMsg' @heights='heights' @inputs='inputMsg'></submit>
		
	</view>
</template>

<script>
	import myfun from '../../commons/js/myFunction.js'
	import submit from '../../components/submit/submit.vue'
	export default {
		data() {
			return {
				user:'',
				friend:'',
				name:'毓帅帅',
				msg:[],
				msgList:[],
				oldTime:new Date(),
				toView:'',
				chatHeight:'',
				inputh:'60'
			}
		},
		components:{
			submit
		},
		mounted() {
			this.getData();
			this.getElementData();
			this.getMsg()
			this.receMsg()
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
			receMsg:function(){
				this.socket.on('getMsg',(msg)=>{
					this.getMsg()
				})
			},
			getMsg:function(){
				return new Promise((resolve,reject)=>{
					uni.request({
						url:'http://localhost:3000/getMsg',
						data:{
							uid:this.user.userid,
							fid:this.friend.userid
						},
						method:"POST",
						success: (data) => {
							this.msg=data.data
							console.log(this.msg)
							for(var i=0;i<this.msg.length;i++){
								if(0<i && i<this.msg.length-1){
									let t=myfun.spaceTime(this.msg[i-1].sendtime,this.msg[i].sendtime);
									if(t){
										this.oldTime=t
									}									
									this.msg[i].time=t
								}
								this.msg[i].tip='toView'+this.msg[i].id;
								if(this.msg[i].msgtype==1){
									this.msgList.push(this.msg[i].msg)
								}
							}
							
							resolve(data)
						},
						fail:(err)=>{
							reject(err)
						},	
					})
				})
			},
			
			async updateMsg(){
				await this.getMsg()
				this.toBottom()
			},
			changeTime:function(date){
				 return myfun.chatTime(date)
			},
			backOne:function(){
				uni.navigateBack({
					delta:1
				})
			},
			priviewImg:function(e){
				let index=0;
				for(let i=0;i<this.msgList.length;i++){
					if(this.msgList[i]==e){
						index=i
					}		
				}
				uni.previewImage({
					current:index,
					urls: this.msgList,
			        longPressActions: {
			            itemList: ['发送给朋友', '保存图片', '收藏'],
				            success: function(data) {
				                console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				            },
							fail: function(err) {
								console.log(err.errMsg);
							}
					}
				});
			},
			
			
			heights:function(e){
				this.inputh=e
				this.toBottom()
			},
			//滚动到底部
			toBottom:function(){
				this.toView=''
				this.$nextTick(function(){
					let length=this.msg.length-1
					this.toView=this.msg[length].tip					
				})
			
			},
			
			getElementData:function(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.chat').boundingClientRect(data => {
				  // console.log("得到布局位置信息" + JSON.stringify(data));
				  // console.log("节点离页面顶部的距离为" + data.top);
				  this.chatHeight=window.screen.height;
				  // console.log(this.chatHeight)
				}).exec();
			},
		}
	}
</script>

<style lang="scss">
@import '../../commons/css/mycss.scss';
.top-bar{
	 background:rgba(250,250,250,0.96);
	 border-bottom: 1px solid rgba(200,200,200,0.5);
}
.chat{
	
	.chat-main{
		padding-left:$uni-spacing-col-base;
		padding-right:$uni-spacing-col-base;
		padding-top: 100rpx;
		//padding-bottom不能写死，有弹出
		// padding-bottom: 120rpx;
	}
	.chat-time{
		font-size: $uni-font-size-base;
		color:$uni-bg-color-grey;
		line-height: $uni-font-size-base;
		padding:20rpx 0 ;
		// border:1px red solid;
		text-align: center;
	}
	.chat-msg{
		display: flex;
		padding: 20rpx 0;
		.chat-img{
			width: 80rpx;
			height: 80rpx;
			border-radius: 20rpx;
			// border: 1px red solid;
		}
		.massage{
			// flex: auto;
			margin:0rpx 10rpx;
			max-width: 440rpx;
		}
		.msg-text{
			font-size: 36rpx;
			// max-width: 440rpx;
			line-height: 44rpx;
			padding: 16rpx 24rpx;
		}
		.msg-img{
			padding: 16rpx 24rpx;
			image{
				max-width: 400rpx;
				max-height: 400rpx;
			}
		}
	}
	.msg-left{
		flex-direction: row;
		// background-color: ;
		.msg-text,.msg-img{
			background-color: #ffff7f;
			border-radius: 0 20rpx 20rpx 20rpx;
		}
		.voice-box{
			.msg-text{
				display: flex;
				.voice-img{
					max-width: 200rpx;
					min-width: 60rpx;
				}
			}
		}
		
	}
	.msg-right{
		flex-direction: row-reverse;
		.msg-text,.msg-img{
			background-color:#62ff74;
			border-radius: 20rpx 0 20rpx 20rpx;
		}
		.voice-box{
			.msg-text{
				display: flex;
				.voice-img{
					max-width: 200rpx;
					min-width: 60rpx;
					transform: rotate(180deg);
				}
			}
		}
	}
	
}
</style>
