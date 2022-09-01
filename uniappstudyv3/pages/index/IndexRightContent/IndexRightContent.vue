<template>
	<view class="indexContent">
		<view class="content" :style="'top:'+list.state.rightTop+'rpx'">
			<view :focus="true" :class="'item'+(index==list.state.boxId&&list.state.box==1?' focus':'')" v-for="(item, index) in list.state.lists" :index="index" :key="index">
				<image class="pic" :src="item.url" mode="scaleToFill" />
				<view style="text-align: center;" class="tittle">
					<text>{{ item.text }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		inject:['list'],
		data() {
			return {
				dynamicList: {},
				keyData:0,
				nowindexs:0,
				
				
			}
		},
		computed:{
			
		},
		onShow() {
			//this.list.sortNavdatas();
			// this.list.focusInit("box0_0");
		},
		methods: {
			tt(){
				// #ifdef APP-PLUS
				
				// #endif
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("@/static/css/index.less");
</style>
