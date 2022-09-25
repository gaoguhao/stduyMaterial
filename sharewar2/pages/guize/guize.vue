<template>
	<Header></Header>
	<!-- 规则 -->
	<view class="guize-show">
		<view class="guize-top-kuai"></view>
		<view class ="guize-background">
		<view class="tittle">
		  <image class="banner" src="@/static/images/tittleBanner@2x.png"/>
		  <span class="tittle-weight">活动规则</span>
		</view>
		<view class="guize-content">
		  <p>1、此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则。</p>
		  <p>2.此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则。</p>
		   <p>3.此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则。</p>
		   <p>4.此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则。规则，此处为活动规则，此处为活动规则，此处为活动规则。</p>
		   <p>4.此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则。规则，此处为活动规则，此处为活动规则，此处为活动规则。</p>
		   <p>4.此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则，此处为活动规则。规则，此处为活动规则，此处为活动规则，此处为活动规则。</p>
		</view>
		<!-- <view class="guize-true" @click="changeGuiZeShowData">知道了</view> -->
		<view class="guize-true" @click="changeGuiZeShowData">
		  <image class="pic" src='@/static/images/guize-true@2x.png'/>
		  <view class="text">知道了</view>
		</view>
	  </view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue';
	export default {
		name:"header",
		components:{
			Header
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	@gloab-var:2rpx;
.guize-show{
	position: absolute;
	width: 375* @gloab-var;
	height: 100%;
	background: rgba(0,0,0,0.5);
	top:0;
	margin: 0 auto;
	left: 0;
	right: 0;
	.guize-top-kuai{
		position: absolute;
		top:55 * @gloab-var;
		width: 375* @gloab-var;
		height: 167* @gloab-var;
	}
	.guize-background{
		width: 375* @gloab-var;
		height: 500* @gloab-var;
		background: #FFFFFF linear-gradient(180deg, #FFE6EC 0%, #FFFFFF 100%);
		border-radius: 8* @gloab-var 8* @gloab-var 0* @gloab-var 0* @gloab-var;
		position: absolute;
		bottom: 0;
		z-index: 99;
		left: 0;
		right: 0;
		margin: 0 auto;
		.tittle{
			position: relative;
			top: 20* @gloab-var;
			.banner{
				width: 6* @gloab-var;
				height: 22* @gloab-var;
			}
			.tittle-weight{
				position: absolute;
				left: 20* @gloab-var;
				height: 22* @gloab-var;
				font-size: 18* @gloab-var;
				font-weight: bold;
				color: #2F3243;
				line-height: 22* @gloab-var;
			}
		}	
	    .guize-content{
			position: relative;
	    	top:20* @gloab-var;
	    	margin: 18* @gloab-var 20* @gloab-var;
	    	height: 350* @gloab-var;
	    	font-size: 14* @gloab-var;
	    	font-weight: 400;
	    	color: #2F3243;
	    	line-height: 24* @gloab-var;
	    	p{
	    		margin: 6* @gloab-var 0;
	    	}
	    	overflow-y: scroll;
	    }
	    .guize-true{
			position: relative;
			bottom:0;
			width: 337 *@gloab-var;
			height: 44 * @gloab-var;
			margin: 0 auto;
			padding: 20 *@gloab-var 0;
			.pic{
				position: absolute;
				width: 337 *@gloab-var;
				height: 44 * @gloab-var;
			}
			.text{
				top:0;
				text-align: center;
				font-size: 16* @gloab-var;
				position: relative;
				font-weight: 500;
				width: 337 *@gloab-var;
				height: 44 * @gloab-var;
				line-height: 44 * @gloab-var;
				color: #FFFFFF;
			}
		}
	}
}	
</style>