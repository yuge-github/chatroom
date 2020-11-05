<template>
	<view class="content">
		<view class='top-bar'>
			<view class="search-div">
				<!-- <image src="../../static/img/搜索.png" class="search-img"></image> -->
				<input type="search" placeholder="搜索用户/群" class="search" placeholder-style="color:#aaa;font-weight:400;" @input="find"
				 @keydown.delete='find' />
				 <image src="../../static/img/搜索.png" class="search-img" @click="show"></image>
			</view>
			
			<view class="top-bar-right">
				<view class="text" @click="backOne">取消</view>
			</view>
		</view>
		<view class="main">
			<view class="search-user result">
				<view class="title">用户</view>
				<view class="list user" v-for="(item,index) in searchlist" :key='index'>
					<navigator url="../user/user?id=aaa">
						<image :src="item.imgurl"></image>
					</navigator>
					<view class="names">
						<view class="name" v-html="item.name"></view>
						<view class="email" v-html="item.email"></view>
					</view>
					<view class="right-bt send" v-if="item.type==2" >发信息</view>
					<view class="right-bt " v-if="item.type==1" >申请中</view>
					<view class="right-bt add" v-if="!item.type" @click="addFriend(item)">加好友</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	export default {
		data() {
			return {
				user: '',
				userarr: [],
				arr: [],
				searchlist:[]
			};
		},
		created() {
			this.getData()

		},
		methods: {
			//获取除自己外其他人的信息
			getData: function() {
				// console.log(localStorage.getItem('user'))
				this.user = JSON.parse(localStorage.getItem('user'))
				if (!this.user) {
					uni.navigateTo({
						url: '../signin/signin'
					})
				}
				uni.request({
					url: 'http://localhost:3000/getAll',
					data: {
						id: this.user.userid
					},
					method: "POST",
					success: (data) => {
						this.arr = data.data
						// console.log(this.user.userid)
						// console.log(this.arr)
					},
					fail: (err) => {
						console.log(err)
					},
				})
			},

			//获取关键词
			find: function(e) {
				this.userarr = [];
				let val = e.detail.value;
				if (val) {
					this.searchUser(val);
				}


			},
			
			//寻找关键词匹配的好友
			searchUser: function(e) {
				uni.request({
					url: 'http://localhost:3000/getAll',
					data: {
						id: this.user.userid
					},
					method: "POST",
					success: (data) => {
						this.arr = data.data
						// console.log(this.user.userid)
						// console.log(this.arr)
					},
					fail: (err) => {
						console.log(err)
					},
				})
				let array = this.arr
				console.log(this.arr)
				let exp = eval("/" + e + "/mg");
				for (let i = 0; i < array.length; i++) {
					//判断字符串是否是空
					// if (!array[i].name || !array[i].email) {
					// 	console.log('err')
					// } else {
						if (array[i].name.search(e) != -1 || array[i].email.search(e) != -1){
							//判断是否为好友
							let uid = this.user.userid
							let fid = array[i].userid
							uni.request({
								url: "http://localhost:3000/getfriend",
								data: {},
								method: "POST",
								success: (data) => {
									let fl=data.data
									for(let i=0;i<fl.length;i++){
										if((fl[i].sendid==uid && fl[i].receid==fid) || ( fl[i].sendid==fid && fl[i].receid==uid )){
											array[i].type=fl[i].type											
										}		
									}
								},
								fail: (err) => {
									console.log(err)
								},
							})
							
							array[i].imgurl = '../../static/userImg/' + array[i].imgurl;
							array[i].name = array[i].name.replace(exp, "<span style='color:#4AAAFF;'>" + e + "</span>")
							array[i].email = array[i].email.replace(exp, "<span style='color:#4AAAFF;'>" + e + "</span>")
							this.userarr.push(array[i])							
						}
					}
				// }
				console.log(this.userarr)
			},
			show:function(){
				this.searchlist=this.userarr
			},
			//返回上一页
			backOne: function() {
				uni.navigateTo({
					url: '../index/index'
				});
			},
			addFriend: function(e) {
				this.setFriend(e)
				setTimeout(function() {
					uni.navigateTo({
						url: '../friend/friend'
					})
				}, 50)

			},
			setFriend: function(e) {
				let uid = e.userid
				uni.request({
					url: "http://localhost:3000/idfind",
					data: {
						id: uid
					},
					method: "POST",
					success: (data) => {
						let friend = data.data[0]
						// console.log(friend)
						localStorage.setItem('friend', JSON.stringify(friend))
					},
					fail: (err) => {
						console.log(err)
					},
				})
			},
			
		}
	}
</script>

<style lang="scss">
	@import '../../commons/css/mycss.scss';

	.top-bar {
		background: rgba(255, 255, 255, 0.96);
		border-bottom: 1px $uni-border-color solid;

		.search-div {
			position: absolute;
			float: left;
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			box-sizing: border-box;
			padding: 14rpx 100rpx 14rpx $uni-spacing-col-base;
		}

		.search {
			// width: 600rpx;
			padding: 0 60rpx 0 12rpx;
			height: 60rpx;
			background: #C8C7CC;
			border-radius: 10rpx;
		}

		.search-img {
			position: absolute;
			background-color: white;
			padding: 5rpx;
			border-radius: 10rpx;
			top: 20rpx;
			right: 110rpx;
			float: right;
			width: 40rpx;
			height: 40rpx;
		}
	}

	.main {
		.result {
			padding: 88rpx 0 0 $uni-spacing-col-base;
		}

		.title {
			margin-top: 20rpx;
			font-size: 44rpx;
			font-weight: 600;
			line-height: 60rpx;
		}

		.list {
			// border:1px red solid;
			padding-top: 40rpx;
			float: left;
			width: 100%;

			image {
				float: left;
				width: 80rpx;
				height: 80rpx;
				border-radius: $uni-border-radius-base;
			}
		}

		.names {
			padding-left: 20rpx;
			float: left;
		}

		.name {
			font-size: 36rpx;
		}

		.email {
			font-size: $uni-font-size-sm;
			color: $uni-text-color;
			line-height: 28rpx;
		}

		.right-bt {

			height: 48rpx;
			width: 120rpx;
			border-radius: 24rpx;
			margin-top: 15rpx;
			margin-right: $uni-spacing-col-base;
			float: right;
			font-size: 25rpx;
			line-height: 48rpx; //和height一样
			text-align: center;
		}

		.send {
			background: rgba(100, 250, 150, 1);

			&:hover {
				color: #FFFFFF;
			}
		}
		.apply {
			background:#A7DBD8;
			color: #333333;
			&:hover{
				color: #A7DBD8;
				background-color: #4CD964;
			}
		}
		.add {
			background-color: #4AAAFF;
			color: #FFFFFF;

			&:hover {
				color: rgba(100, 250, 150, 1);
			}
		}

	}
</style>
