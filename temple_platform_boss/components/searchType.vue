<template>
	<div>
		<div class="TypeNav bg-f mb8">
			<view class="navItem">
				<view :class="['aLink',searchType=='today'?'cur':'']" @click="search('today')">今日</view>
				<view :class="['aLink',searchType=='yesterday'?'cur':'']" @click="search('yesterday')">昨天</view>
				<view :class="['aLink',searchType=='thismonth'?'cur':'']" @click="search('thismonth')">本月</view>
				<view :class="['aLink',searchType=='prevmonth'?'cur':'']" @click="search('prevmonth')">上月</view>
				<view :class="['aLink',searchType=='summary'?'cur':'']" @click="search('summary')">汇总</view>
				<view :class="['aLink',searchType == 'order' ? 'cur' :'']" @click="search('order')">选择日期</view>
			</view>
			<view class="other-time" v-if="searchType == 'order' && otherTime == true">
				<view class="item"><weui-input v-model="ruleform.start_date" type="date" name="start_date"></weui-input></view>
				<view class="and">—</view>
				<view class="item"><weui-input v-model="ruleform.end_date" type="date" name="end_date"></weui-input></view>
				<view class="ml10" @click="searchDate"><dx-button type="primary" size="medium" block>搜索</dx-button></view>
			</view>
		</div>
	</div>
</template>

<script>
import dxButton from "doxinui/components/button/button"
 export default{
	components:{dxButton},
	props:['searchType',"ruleform"],
	data() {
		return {
			//ruleform:{}
			otherTime: true,
		}
	},
	methods:{
		search(searchType){
			this.getParent(this).searchType = searchType;
			if(searchType !='order'){
				this.getParent(this).show = false;
				this.getParent(this).ajax();
			}
			if(searchType =='order'){
				this.otherTime = true;
			}
		},
		searchDate(){
			this.otherTime = false;
			this.$emit('searchDateCallBack');
		}
	 }
 }
</script>

<style>
.TypeNav{padding: 16upx 20upx;position: relative;}
.TypeNav .navItem{display: flex;width: 100%;background: #F5F5F5;border-radius: 34upx;}
.TypeNav .navItem .aLink{width: 100%;text-align: center;color: #999;line-height: 68upx;font-size: 28upx;}
.TypeNav .navItem .aLink:last-child{width: 150%;}
.TypeNav .navItem .cur{background: #409eff;color: #fff;border-radius: 34upx;}
</style>