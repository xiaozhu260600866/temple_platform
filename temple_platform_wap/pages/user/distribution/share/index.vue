<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
		<!-- 	<view class="share-top">
				<view class="son_tab">
					<dx-tabs :tabs="tabsSon" :height="96" :sliderWidth="150" :sliderHeight="60" bottom="50%" color="#888" selectedColor="#A98853"
					 sliderBgColor="rgba(169, 136, 83,0.15)" v-model="searchType" @change="search"></dx-tabs>
					<view class="other-time" v-if="searchType == 'other'">
						<weui-input v-model="ruleform.start_date" type="date" name="start_date"></weui-input>
						<view class="and">—</view>
						<weui-input v-model="ruleform.end_date" type="date" name="end_date" @callback="search_"></weui-input>
					</view>
				</view>
			</view> -->
			<view class="share-lists" style="margin-top:0">
				<view class="share-item block-sec" v-for="(v,key) in data.lists.data">
					<dx-list-msg :imgSrc="v.firstCover?v.firstCover:'https://temple.doxinsoft.com/images/nouser.png'" :name="v.name"
					 padding="24rpx 30rpx" :imgR="6" :imgWidth="90" :imgHeight="69">
						<view slot="con" class="slot-con fc-9 fs-13">
							<view class="row flex-middle">
								<view>随喜次数：<text class="Arial fc-3 pr3">{{v.buyCount}}</text>次</view>
								<view class="pl15">阅读次数：<text class="Arial fc-3 pr3">{{v.shareData.length}}</text>次</view>
							</view>
							<!-- <view class="row">分享时间：<text class="Arial">{{ v.created_at }}</text></view> -->
						</view>
					</dx-list-msg>
					<view class="read-people">
						<!-- 最多显示9个 -->
						<view class="read-group">
							<view class="p-item" v-for="(shareData,shareKey) in v.shareData" v-if="shareKey < 9">
								<image class="img" :src="shareData.getUser ? shareData.getUser.headimgurl :'https://boss.doxinsoft.com/images/wap/group-who.png'" />
							</view>
							<view class="ellipsis fs-12 fc-9 pl3" v-if="v.shareData.length >=9">•••</view><!-- 当超过9人显示 -->
						</view>
						<view class="fs-13 fc-6" @click="goto('/pages/user/distribution/share/layouts/people?activity_id='+v.id,1)">查看更多<text class="iconfont icon-right fs-12"></text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "../people/index.css";
	import dxTabs from "doxinui/components/tabs/tabs"
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	export default {
		components:{dxTabs,dxListMsg},
		data() {
			return {
				formAction: '/user/activity-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				searchType: 'threeyear',
				ruleform:{},
				tabsSon: [
					{value: 'threeyear',name: "全部"},
					{value: 'today',name: "今日"},
					{value: 'yesterday',name: "昨日"},
					{value: 'thismonth',name: "本月"},
					{value: 'other',name: "自定义"},
				],
				shareLists:[
					{cover: 'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',title: '建议观音寺',created_at: '2020-08-02 09:36:25'}
				],
				readArr:[
					{headerPic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/KkjmxTQZuibdnIOVQNialTu1sK6IBa4kCFbbNiaKJXJoOuVFlibrAjJqoC7xzZx6WGb0eltb0VDrG4oFmWo0QQU8HA/132'},
					{headerPic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/kzrmgBsECQibKiblwAxN7h9sY9YGlJEzibO4AShmpUzgAYvoNtC6XiaibwCuuZrDbM0TSWhzBhC79uYEwIwhJ3ibZX6Q/132'},
					{headerPic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/ricBHcHiaUya3OQNGBOI4u9wzEGtwV9MibOrLeZcgtbiaSMryvXO1f1mOcf9vWTyeFLFksrIoDAb66q9pl7yRGtCzA/132'},
					{headerPic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/KkjmxTQZuibdnIOVQNialTu1sK6IBa4kCFbbNiaKJXJoOuVFlibrAjJqoC7xzZx6WGb0eltb0VDrG4oFmWo0QQU8HA/132'},
					{headerPic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/kzrmgBsECQibKiblwAxN7h9sY9YGlJEzibO4AShmpUzgAYvoNtC6XiaibwCuuZrDbM0TSWhzBhC79uYEwIwhJ3ibZX6Q/132'},
					{headerPic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/ricBHcHiaUya3OQNGBOI4u9wzEGtwV9MibOrLeZcgtbiaSMryvXO1f1mOcf9vWTyeFLFksrIoDAb66q9pl7yRGtCzA/132'},
					{headerPic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/KkjmxTQZuibdnIOVQNialTu1sK6IBa4kCFbbNiaKJXJoOuVFlibrAjJqoC7xzZx6WGb0eltb0VDrG4oFmWo0QQU8HA/132'},
					{headerPic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/kzrmgBsECQibKiblwAxN7h9sY9YGlJEzibO4AShmpUzgAYvoNtC6XiaibwCuuZrDbM0TSWhzBhC79uYEwIwhJ3ibZX6Q/132'},
					{headerPic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/ricBHcHiaUya3OQNGBOI4u9wzEGtwV9MibOrLeZcgtbiaSMryvXO1f1mOcf9vWTyeFLFksrIoDAb66q9pl7yRGtCzA/132'},
				]
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
		onShow(){
			console.log(123)
			this.onShow(this);
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped="">
@import url("./index.css");
</style>