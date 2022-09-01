<template>
	<!-- <view>
		{{list.state.nowIndex}}
	</view>
	<button  @click="changeNowIndex">changeNowIndex</button> -->
	<view class="leftNav">
		<view class="content">
			<view v-for="(item,index) in list.state.navdatas" :key="item.stated" :index="index" :class="'item'+(item.selected?' seleced':'')+(list.state.box==0&&list.state.boxId==index?' focus':'')">
				<text class="tittle">{{item.tittle}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		inject:['list'],
		data() { 
			return {
				indexs:0
			}
		},
		onShow() {
			this.list.sortNavdatas();
			// this.list.focusInit("box0_0");
		},
		methods: {
			changeNowIndex:function(){
				this.list.changeState(this.indexs++)
			}
		}
	}
</script>

<style lang="less">
@import url("@/static/css/index.less");
</style>
