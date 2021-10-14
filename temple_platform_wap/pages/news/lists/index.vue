<template>
	<div>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view id="project_list" v-if="data.show">
			<view class="list" v-for="v in data.lists.data">
				<view class="item bg-f flex p15" @click="toShow(v)">
					<view class="limg mr15"><img class="img lazy flex" :src="v.firstCover"></view>
					<view class="rt flex1">
						<view class="tt fs-16 nowrap">{{v.title}}</view>
						<view class="td fs-12 mt5 wrap2">{{v.intro}} </view>
						<view class="tp fs-12"><span class="iconfont icon-heart-o fs-12 pr3"></span>共<span class="r fs-12">{{v.views}}</span>查看</view>
					</view>
				</view>
			</view>
			<hasMore :parentData="data"></hasMore>
		</view>
	</div>

</template>

<script>
	import "./index.css";
	export default {
		components: {},
		data() {
			return {
				formAction: '/article/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				showType: 0,
				selectKey: 0,
				ruleform: {},
				vaildate: {},
				getSiteName: this.getSiteName(),
			}
		},
		computed: {

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
			toShow(item) {
				if (item.type == 'article') {
					this.goto('/pages/news/show/index?id=' + item.id, 1)
				} else {
					window.location.href = item.gotourl;
				}

			},
			ajax() {
				
				this.getAjax(this).then(msg => {

				});
			}
		}
	}
</script>
