<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="" v-if="data.user">
			<view class="dis-header main-bg">
				<view class="head-img">
					<img class="img" :src="data.user.headerPic">
				</view>
				<view class="dis-info fc-white">
					<view class="name fs-18">{{ data.user.userInfo.company_name}}</view>
					<view class="flex-baseline fs-16 mt10">
						<view class="name mr10">{{ data.user.userInfo.name}}</view>
						<view class="phone Arial">{{ data.user.userInfo.phone}}</view>
					</view>
				</view>
			</view>
			<view class="sup-sec">
				<view class="sec-group" @click="goto('/pages/staff/count/index',1)">
					<view class="icon_img"><image class="img" :src="getSiteName+'/images/wap/wap-index01.png'"></image></view>
					<view class="name">随喜收益</view>
				</view>
				<view class="sec-group" @click="goto('/pages/staff/withdraw/index',1)">
					<view class="icon_img"><image class="img" :src="getSiteName+'/images/wap/wap-index02.png'"></image></view>
					<view class="name">一键提现</view>
				</view>
				<view class="sec-group" @click="goto('/pages/staff/withdraw/lists',1)">
					<view class="icon_img"><image class="img" :src="getSiteName+'/images/wap/wap-index03.png'"></image></view>
					<view class="name">提现明细</view>
				</view>
				<view class="sec-group" @click="goto('/pages/staff/info/index',1)">
					<view class="icon_img"><image class="img" :src="getSiteName+'/images/wap/wap-index04.png'"></image></view>
					<view class="name">基本资料</view>
				</view>
			</view>
			<view class="sup-account bg-f pt12 mb12">
				<view class="name fs-14 fc-7 text-center">基本账户（随喜总数 - 平台服务费）</view>
				<view class="flex-center flex-middle" @click="goto('/pages/staff/count/index',1)">
					<view class="price fs-16">￥<span class="fs-30">{{data.price_all}}</span></view>
				</view>
				<view class="ac-group">
					<view class="ac-row">
						<view class="label">账户余额</view>
						<view class="value">￥<span>{{data.price}}</span></view>
					</view>
					<view class="ac-row">
						<view class="label">已提现</view>
						<view class="value">￥<span>{{data.price_out}}</span></view>
					</view>
					<view class="ac-row">
						<view class="label">提现审核中</view>
						<view class="value">￥<span>{{data.price_outing}}</span></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import searchType from '@/components/searchType'
		import '../../../provider.js';
	export default {
		components:{searchType},
		data() {
			return {
				formAction: '/staff/do-money',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				show: false,
				checkAuth:0,
				putaway:1,
				putaway0amount:0,
				putaway1amount:0,
				online:1,
				searchType:'today',
				online0Lists:[],
				online1Lists:[],
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
			logot(){
				this.getConfirm("是否退出",msg=>{
					this.postAjax("/staff/logout").then(msg=>{
						if(msg.data.status ==2){
							this.goto("/pages/staff/login/main");
						}
					});
					
				});
			},
			searchDateCallBack(){
				console.log(1)
				this.getAjax(this,{
					created_at_start: this.ruleform.start_date,
					online:this.online,
					created_at_end:this.ruleform.end_date
					}).then(msg => {
					this.show = true;
					this.putaway0amount = 0;
					this.putaway1amount = 0;
					this.data.listsNew.forEach(v=>{
						 if(v.putaway == 0){
							 this.putaway0amount+=parseFloat(v.order_num);
						 }
						 if(v.putaway == 1){
							this.putaway1amount+=parseFloat(v.order_num);
						 }
					})
					this.online1Lists = this.data.listsNew;
					this.online0Lists = this.data.online0Lists;
					this.$nextTick(()=>{
						this.$refs.page.share("在线管理");
					})
				});
			},
			
			ajax() {
				this.getAjax(this,{ searchType: this.searchType,online:this.online }).then(msg => {
				
					this.show = true;
					this.putaway0amount = 0;
					this.putaway1amount = 0;
					this.data.listsNew.forEach(v=>{
						 if(v.putaway == 0){
							 this.putaway0amount+=parseFloat(v.order_num);
						 }
						 if(v.putaway == 1){
							this.putaway1amount+=parseFloat(v.order_num);
						 }
					})
					this.online1Lists = this.data.listsNew;
					this.online0Lists = this.data.online0Lists;
					this.$nextTick(()=>{
						this.$refs.page.share("在线管理");
					})
					this.show = true;
				});
			}
		}
	}
</script>
<style>
@import "./index.css";
</style>