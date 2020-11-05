<template>
	<view>
		<view class="emoji" >
			<view class="emoji-line" v-for="(line,i) in emojis" :key='i' >
				<view class="emoji-line-item" v-for="(item,index) in line" :key='index' @tap='getEmoji(item)'>
					{{item}}
				</view>
			</view>
			<view class="emoji-btn">
				<view class="emoji-btn-item">
					<view class="emoji-delete" @click="deleteMsg">删除</view>
				</view>
				<view class="emoji-btn-item ">
					<view class="emoji-send" @click="submitMsg">发送</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {	
				emojis:[
					['😀','😁','😂','😆','☹','👙','💩'],
					['👶','👧','👨','👩','👴','👨🏻‍🎓','👨‍🍳'],
					['👶','👧','👨','👩','👴','👨🏻‍🎓','👨‍🍳'],
					['👶','👧','👨','👩','👴','👨🏻‍🎓','👨‍🍳'],
					['👶','👧','👨','👩','👴','👨🏻‍🎓','👨‍🍳'],
					['👶','👧','👨','👩','👴','👨🏻‍🎓','👨‍🍳'],
					['👶','👧','👨','👩','👴','👨🏻‍🎓','👨‍🍳'],
					['👶','👧','👨','👩','👴','👨🏻‍🎓','👨‍🍳'],
					['👶','👧','👨','👩','👴','👨🏻‍🎓','👨‍🍳'],
					['👶','👧','👨','👩','👴','👨🏻‍🎓','👨‍🍳'],
					
				],
			}
		},
		methods:{
			getEmoji:function(e){
				// console.log(e)
				this.$emit('getEmoji',e)
			},
			submitMsg:function(){
				this.$emit('submitMsg')
			},
			deleteMsg:function(){
				this.$emit('deleteMsg')
			}
		}
		
	}
	
</script>

<style lang="scss">
	.emoji{
		width: 200%;
		// border: 1px red solid;
		height: 440rpx;
		box-sizing: border-box;
		padding: 10rpx;
		overflow: hidden;
		overflow-y:auto;
		.emoji-line{
			display: flex;
			.emoji-line-item{
				flex:1;
				text-align: center;
				font-size: 40rpx;
			}
		}
	}
	.emoji-btn{
			position: fixed;
			bottom: 25rpx;
			right: 20rpx;
			display: flex;
	    	.emoji-btn-item{
				background-color: rgba(230,230,230,0.5);
				padding: 1rpx 10rpx;
				font-size: 40rpx;
	    	}
			.emoji-delete{
				padding: 10rpx;
				background-color: rgba(144,144,144,0.6);
				&:hover{
					color: white;
					background-color: rgba($color: #000000, $alpha: 0.6);
				}
			}
			.emoji-send{
				padding: 10rpx;
				background-color: rgba($color: #ffe667, $alpha: 0.6);
				&:hover{
					color: white;
					background-color: rgba($color: #ff4800, $alpha: 0.6);
				}
			}
	}
</style>
