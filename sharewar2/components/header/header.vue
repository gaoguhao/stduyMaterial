<template>
	<view class="header">
		<image class="header-backimage" src="@/static/images/logo@2x.png" mode="scaleToFill"/>
		<image class = "back-ico" src='@/static/images/goBackicon@2x.png' mode="scaleToFill"></image>
		<navigator url="../guize/guize"><image class = "huodong-ico" src='@/static/images/huodongguize@2x.png' mode="scaleToFill"></image></navigator>
	</view>
</template>

<script>
	
	export default {
		name:"header",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	@gloab-var:2rpx;
	.header{
		position: relative;
		width: 375 * @gloab-var;
		margin: 0 auto;
		height: 306 * @gloab-var;
		.header-backimage{
			position: absolute;
			width: 375 * @gloab-var;
			margin: 0 auto;
			height: 306* @gloab-var;
		}
		.back-ico{
			position: relative;
			top:0;
			left:0;
			width: 44* @gloab-var;
			height: 44* @gloab-var;
			margin: 7 * @gloab-var 20* @gloab-var;
		}
		.huodong-ico{
			position: relative;
			top:31 *@gloab-var;
			left:0;
			width: 60 * @gloab-var;
			height: 22 * @gloab-var;
			float: right;
			right: 0;
		}
	}
</style>