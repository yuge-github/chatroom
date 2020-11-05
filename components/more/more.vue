<template>
	
</template>

<script>
	export default {
		data() {
			return {
				filePaths:[]
			};
		},
		methods:{
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
				    success: function (res) {
				        this.filePaths=res.tempFilePaths;
						localStorage.setItem('Img',this.filePaths)
						console.log(localStorage.getItem('Img'))
				    },
					
				})
				
			},
		}
	}
</script>

<style lang="scss">
	
</style>
