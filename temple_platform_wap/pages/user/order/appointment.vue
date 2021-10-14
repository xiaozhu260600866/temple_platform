<template class="user-body">
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show">
			<!-- <dx-tabs v-model="data.query.status" :tabs="tabs"  @change="change"  selectedColor="#A98853" sliderBgColor="#A98853" :nameSize="16" :height="88"></dx-tabs> -->
			<view class="Oitem-list bg-f" >
				<view class="item p12 bd-be" v-for="v in data.lists.data">
					<view class="linfo flex1 w-b100">
						<view class="flex-between">
							<view class="tt fs-17 fc-3 pr15 lh-24 flex1">{{v.name}}</view>
							<view class="fs-14 fc-6">
							<dx-button size="mini" btnBd="#A98853" round>{{ v.status == 0? '待确认':'预约成功' }}</dx-button>
							</view>
						</view>
						<view class="lh-22 fc-3 mt5"></view>
							<view class="td fs-15">预约日期：{{v.date}} {{v.time}}</view>
							<view class="td fs-15">预约事务：{{v.affairType}}</view>
							<view class="td fs-15" v-if="v.remark">备注：{{v.remark}}</view>
							<view class="td fs-15 fc-6">{{v.created_at}}</view>
						</view>
					</view>
				</view>
			</view>
			<hasMore :parentData="data"></hasMore>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import dxTabs from "doxinui/components/tabs/tabs"
	import dxButton from "doxinui/components/button/button"　
	export default {
		components: {
			dxTabs,
			dxButton
		},
		data() {
			return {
				formAction: '/user/appointment',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				tabs: [{
					name: "未确认",
					value:0,
				}, {
					name: "已确认",
					value:1
				}],
				status: 0,
				message: false
			}
		},

		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.$preview.on('close',()=>{//close只是众多事件名的其中一个，更多请查看文档
			    window.location.reload();
			})
			this.ajax();
		},
		onShow(){
			this.onShow(this,1);
		},
		
		methods: {
			change(e) {
				this.ajax();
			},
			ajax() {
				// this.$nextTick(()=>{
				// 	this.$refs.page.share('观音开库','https://temple.doxinsoft.com/images/3033.jpg','日行一善');
				// })
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
