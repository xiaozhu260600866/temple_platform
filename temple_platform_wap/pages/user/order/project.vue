<template class="user-body">
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<div v-if="data.show">
			<view>
				<!-- <view class="order-class bd-b bg-f">
					<view class="nav-tab" @click="status = 1"><view :class="['name',status == 1 ? 'selected' :'']">按时间排列</view></view>
					<view class="nav-tab" @click="status = 0"><view :class="['name',status == 0 ? 'selected' :'']">按项目归类</view></view>
				</view> -->
				<dx-tabs v-model="status" :tabs="tabs"  @change="change"
				 selectedColor="#A98853" sliderBgColor="#A98853" :nameSize="16" :height="88"></dx-tabs>
				<view class="Oitem-list bg-f" v-if="status == 0">
					<!-- 捐赠项目start -->
					<view class="item bd-be" v-for="v in data.projectLists" v-if="v.is_tablet ==0"><!-- v-for -->
						<view class="pro-info flex p15">
							<view class="limg mr15"><img class="img flex" :src="v.pic"></view>
							<view class="rt flex1">
								<view class="tt fs-17 nowrap fc-3 lh-26">{{v.name}} </view>
								<view class="td fs-15 lh-20">已捐款金额：<span class="fs-14">{{v.orderSum}}</span>元</view>
								<view class="td fs-15 lh-20">已捐款次数：<span class="fs-14">{{v.orderNum}}</span>次</view>
							</view>
						</view>
						<view class="btn-group flex plr15 pb10">
							<view class="nav" @click="goto('/pages/project/show/index?id='+v.project_id,1)">查看动态</view><!-- 跳转项目详情 -->
							<view class="nav" @click="v.openEvaluate = !v.openEvaluate">查看记录<span class="iconfont icon-bottom"></span></view>
						</view>
						<view class="msg-record plr15 pb10" v-if="v.openEvaluate"><!-- 读最新的 -->
							<view class="list fs-15 fc-3" v-if="v.order && v.order.name">登记人姓名：{{v.order.name}}</view>
							<view class="list fs-15 fc-3" v-if="v.order && v.order.phone">登记人电话：{{v.order.phone}}</view>
							<view class="list fs-15 fc-3" v-if="v.order && v.order.bless_name">功德主姓名：{{v.order.bless_name}}</view>
							<view class="list fs-15 fc-3" v-if="v.order && v.order.bless_address">登记人地址：{{v.order.bless_address}}</view>
							<view class="list fs-15 fc-3" v-if="v.order && v.order.remark">备　　　注：{{v.order.remark}}</view>
							<view class="list fs-15 fc-3">回　向　文：{{v.evaluate}}</view>
						</view>
					</view>
					<!-- 捐赠项目end -->
					
				</view>
				<view class="Otime-list bg-f" v-if="status == 1">
					<view class="item flex p12 fc-6 bd-be" v-for="v in data.lists.data" v-if="v.projects"><!-- v-for -->
						<view class="linfo flex1 w-b100">
							<view class="tt fs-17 fc-3 pr15 lh-24">{{v.projects.name}}</view>
							<view class="td fs-15 lh-20 mt5">序号：{{v.order_no}}</view>
							<view class="td fs-15 lh-20">{{v.payed_at}}</view>
						</view>
						<view class="rinfo">
							<view class="rprice fs-16 text-right"><span class="price fs-18">{{v.amount}}</span>份</view>
							<view class="nav mt10" @click="openDiag = true;$refs.receipt.ajax(v,true)">电子收据</view>
							<view class="nav mt5" @click="openDiag = true;$refs.cert.ajax(v,true)">功德证书</view>
						</view>
					</view>
				</view>
			</view>
			
			<receipt ref="receipt"></receipt>
			<cert ref="cert"></cert>
			<view class="p50 text-center fc-9 fs-14" v-if="data.projectLists.length == 0 && status == 0">暂无数据</view>
			<view class="p50 text-center fc-9 fs-14" v-if="data.lists.data.length == 0 && status ==1">暂无数据</view>
		</div>
		
	</view>
</template>

<script>
	import "./index.css";
	import receipt from "@/components/receipt.vue";
	import cert from "@/components/cert.vue";
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{
			cert,receipt,dxTabs
		},
		data() {
			return {
				formAction: '/project/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				openDiag:false,
				status: 1,
				message: false,
				tabs: [{
					name: "按项目归类",
					value:0,
				}, {
					name: "按时间排列",
					value:1
				}],
				status: 1,
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
			
			this.ajax();
		},
		onShow(){
			if(this.openDiag){
				window.location.reload();
			}
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
					
					//this.getSiteName() + '/upload/images/product/300_'+
					// wx.downloadFile({
					// 	url:this.getSiteName + '/upload/images/product/'+msg.siteConfig.share_logo,
					// 	success:res=>{
					// 		this.data.siteConfig.share_logo = res.tempFilePath;
					// 	}
					// });
				});
			}
		}
	}
</script>
