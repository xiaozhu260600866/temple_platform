<template>
	<view class="bg-f">
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show">
			<view class="donation-list lh-24 ptb10 bd-be plr15" v-for="v in data.lists.data" v-if="v.projects">
				<view class="name fs-16">{{v.bless_name}}：{{v.projects.name}}供养{{getAmount(v.amount)}}份。</view>
			</view>
			<hasMore :parentData="data"></hasMore>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/project/order/lists?type=all',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
		onLoad() {
			this.ajax();
		},
		onShow() {
			this.onShow(this);
		},
		methods: {
			ajax() {
				// this.$nextTick(()=>{
				// 	this.$refs.page.share('观音开库','https://temple.doxinsoft.com/images/3033.jpg','日行一善');
				// })
				this.getAjax(this).then(msg => {
					//let desc = "当八周年庆典遇上双“十一”活动，全年仅此一次，不容错过，11元开团，可2-5人组团报名，低至六折";
					//this.$refs.page.share('嫣艺舞蹈','https://yy-dance.doxinsoft.com/upload/images/product/G5UVwKktkv.jpeg',desc);
				});
			}
		}
	}
</script>
