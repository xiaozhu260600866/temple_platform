<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="share-top">
				<!-- <view class="bd-be">
					<dx-tabs :tabs="tabs" selectedColor="#A98853" sliderBgColor="#A98853" @change="change" v-model="tabsStatus" :size="32" :height="100"></dx-tabs>
				</view> -->
				<view class="son_tab">
					<dx-tabs :tabs="tabsSon" :height="96" :sliderWidth="150" :sliderHeight="60" bottom="50%" color="#888" selectedColor="#A98853"
					 sliderBgColor="rgba(169, 136, 83,0.15)" v-model="searchType" @change="ajax"></dx-tabs>
					<view class="other-time" v-if="searchType == 'other'">
						<weui-input v-model="ruleform.start_date" type="date" name="start_date"></weui-input>
						<view class="and">—</view>
						<weui-input v-model="ruleform.end_date" type="date" name="end_date" @callback="search_"></weui-input>
					</view>
				</view>
			</view>
			<view class="people-amount fc-9">共有<text class="Arial fc-3 plr3">{{data.count}}</text>位朋友</view>
			<view class="people-lists">
				<dx-list-msg :imgSrc="v.getUser.headimgurl?v.getUser.headimgurl:'https://temple.doxinsoft.com/images/nouser.png'" :name="v.getUser.nickname" v-for="(v,key) in data.lists.data" padding="24rpx 30rpx">
					<view slot="con" class="slot-con fc-9 fs-13">
						<view class="row flex-middle">
							<view>随喜次数：<text class="Arial fc-3 pr3">{{v.orderCount}}</text>次</view>
							<!-- <view class="pl15">文章阅读：<text class="Arial fc-3 pr3">20</text>次</view> -->
						</view>
						<view class="row">关注时间：<text class="Arial">{{ v.created_at }}</text></view>
					</view>
				</dx-list-msg>
			</view>
			<hasMore :parentData="data"></hasMore>
		</view>
	</view>
</template>

<script>
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{dxListMsg,dxTabs},
		data() {
			return {
				formAction: '/user/share',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				dataShow: false,
				amount: 2,
				ruleform: {
					start_date: '',
					end_date: ''
				},
				shareLists:[{
					cover:'/static/cert.jpg',
					name: '东信科技',
					time: '2020-07-24',
					status: '已绑定'
				},{
					cover:'/static/cert.jpg',
					name: '东信科技',
					time: '2020-07-24',
					status: '已绑定'
				}],
				tabsStatus: 0,
				tabs: [
					{value: 0,name: "全部",num: 3},
					{value: 1,name: "分享"},
					{value: 2,name: "随喜",num: 10},
				],
				searchType: 'threeyear',
				tabsSon: [
					{value: 'threeyear',name: "全部"},
					{value: 'today',name: "今日"},
					{value: 'yesterday',name: "昨日"},
					{value: 'thismonth',name: "本月"},
					{value: 'other',name: "自定义"},
				],
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			
			ajax() {
				this.getAjax(this,{searchType:this.searchType}).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped="">
@import url("./index.css");
</style>