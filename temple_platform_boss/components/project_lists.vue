<template>
	<view id="project_list">
		<view class="list" v-for="v in lists.data"> 
			<view class="item" @click="v.type == 1 ? goto('/pages/project/show/index?id='+v.id,1) : goto('/pages/meal_coupon/buy/index?project_id='+v.id,1)">
				<view class="limg"><img class="img" :src="v.firstCover"></view>
				<view class="rtxt flex1">
					<view class="rtt">
						<view class="tt wrap2">{{v.name}}</view>
						<view class="td wrap2" v-if="v.intro"> {{v.intro || ''}} </view>
					</view>
					<view class="rtb"><span class="iconfont icon-heart-o"></span>共<span class="num">{{getAmount(v.orderSum)}}</span>份随喜</view>
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