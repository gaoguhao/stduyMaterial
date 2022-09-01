<template>
	<view>
		<IndexLeftNav />
		<slot v-if="list.state.indexNum==0">
			<IndexRightContent />
		</slot>
		
	</view>
</template>

<script>
	import IndexLeftNav from './IndexLeftNav/IndexLeftNav.vue';
	import IndexRightContent from './IndexRightContent/IndexRightContent.vue'
	import list from '@/store/list/index.js';
	export default {
		data(){
			return{
				list:list,
			}
		},
		provide:{
			list
		},
		components:{
			IndexLeftNav,
			IndexRightContent,
		},
		computed:{
			
		},
		onShow() {
			if(list.state.navdatas[0].selected){
				this.list.focusInit("box1_0");
				list.updateIndexNum(0);
			}else{
				for (let item in list.state.navdatas) {
					if(list.state.navdatas[item].selected){
						list.updateIndexNum(item);
						this.list.focusInit("box0_"+item);
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	
</style>