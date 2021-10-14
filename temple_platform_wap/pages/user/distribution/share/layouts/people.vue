<template>
	<view class="pb30">
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="lh-44 plr15 fc-9 fs-15">共<text class="Arial fc-3">{{data.count}}</text>人</view>
			<view class="more-people bg-f">
				<dx-list-msg :imgSrc="v.getUser?v.getUser.headimgurl:'https://temple.doxinsoft.com/images/nouser.png'" :name="v.getUser.nickname" v-for="(v,key) in data.lists.data" v-if="v.getUser" padding="24rpx 30rpx">
					<view slot="con" class="slot-con fc-9 fs-13 mt3">
						<view class="row flex-middle">
							<view>随喜次数：<text class="Arial fc-3 pr3">{{v.orderCount}}</text>次</view>
						</view>
						<view class="row">阅读时间：<text class="Arial">{{ v.created_at }}</text></view>
					</view>
				</dx-list-msg>
			</view>
			<!-- <hasMore :parentData="data"></hasMore> -->
		</view>
	</view>
</template>

<script>
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	export default {
		components:{dxListMsg},
		data() {
			return {
				formAction: '/user/share',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				peopleLists:[
					{nickname: '东信科技-强',headerPic: 'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',created_at: '2020-08-15 17:45:25'},
					{nickname: '东信科技-强',headerPic: 'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',created_at: '2020-08-15 17:45:25'},
					{nickname: '东信科技-强',headerPic: 'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',created_at: '2020-08-15 17:45:25'},
					{nickname: '东信科技-强',headerPic: 'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',created_at: '2020-08-15 17:45:25'},
					{nickname: '东信科技-强',headerPic: 'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',created_at: '2020-08-15 17:45:25'},
					{nickname: '东信科技-强',headerPic: 'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',created_at: '2020-08-15 17:45:25'},
					{nickname: '东信科技-强',headerPic: 'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',created_at: '2020-08-15 17:45:25'},
					{nickname: '东信科技-强',headerPic: 'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',created_at: '2020-08-15 17:45:25'},
					{nickname: '东信科技-强',headerPic: 'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',created_at: '2020-08-15 17:45:25'},
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
@import url("../index.css");
</style>