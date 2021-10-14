<template>
	<div>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<div v-if="data.show">
			<tabletLists :lists="data.lists"></tabletLists>
		</div>
	</div>

</template>

<script>
	import "./index.css";
	import tabletLists from "@/components/tablet_lists.vue";
	export default {
		components: {tabletLists},
		data() {
			return {
				formAction: '/tablet/lists',
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
					this.$nextTick(()=>{
						this.$refs.page.share('江门观音寺牌位登记',this.getSiteName + '/upload/images/product/300_'+this.data.siteConfig.share_logo,'牌位登记');
					})
				});
			}
		}
	}
</script>
