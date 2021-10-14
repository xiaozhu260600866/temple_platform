<template>
	<view id="project_list">
		<view class="list" v-for="v in lists.data"> 
			<view class="item bg-f flex p15" @click="goto('/pages/tablet/activity/index?id='+v.id,1)">
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