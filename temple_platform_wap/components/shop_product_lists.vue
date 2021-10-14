<template>
	<view id="project_list">
		<view class="list" v-for="v in lists.data"> 
			<view class="item bg-f flex p15" @click="goto('/pages/shop/show/index?id='+v.id,1) ">
				<view class="limg mr15"><img class="img lazy flex" :src="v.firstCover"></view>
				<view class="rt flex1 lh-20">
					<view class="tt fs-17 wrap2">{{v.name}}</view>
					<view class="td fs-13 mt5 wrap2" > {{v.intro || ''}} </view>
					<view class="tp fs-13"><span class="r Arial fs-18">{{v.price}}</span>元</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['lists'],
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped="scoped">
#project_list .item{border-bottom: 1px solid #ebebeb;}
#project_list .item .img {width: 120px;height: 92px;border-radius: 7px;}
#project_list .item .rt {color: #666;display: flex;height: 92px;align-content: space-between;flex-wrap: wrap;}
#project_list .item .rt .tn {height: 15px;}
#project_list .item .rt .tt {color: #333;line-height: 1;width: 100%}
#project_list .item .rt .td {color: #666;height: 29px;width: 100%}
#project_list .item .rt .tp .r{color: #fd6512;margin: 0 3px;width: 100%}
#project_list .item .rt .iconfont{color: #A98853;}
</style>
