<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="" v-if="data.user">
			<searchType2 :searchType="searchType" :ruleform="ruleform" @searchDateCallBack="searchDateCallBack"></searchType2>
			<view class="stuff mb12">
				<view class="stuff-sec bg-f flex flex-wrap">
					<view class="sec-group" >
						<image class="img" src="https://temple.doxinsoft.com/images/wap/boss-I01.png"></image>
						<view class="p">随喜收益</view>
						<view class="num">{{data.payed_count}}<text class="unit pr10">单</text>{{(putaway1amount + putaway0amount).toFixed(2)}}<text class="unit">元</text></view>
					</view>
					<!-- <view class="sec-group" @click="goto('/pages/boss/offline/lists/index',1)">
						<image class="img" src="https://temple.doxinsoft.com/images/wap/boss-I02.png"></image>
						<view class="p">线下捐赠</view>
						<view class="num">{{data.payed_count_}}<span class="pr10">单</span>{{data.payed_amount_}}<span>元</span></view>
					</view> -->
				</view>
			</view>
			<view class="sup-account bg-f">
			<!-- 	<view class="name fs-14 fc-7 text-center">数据汇总</view>
				<view class="flex-center flex-middle">
					<view class="price fs-30">{{(putaway1amount + putaway0amount).toFixed(2)}}</view>
				</view> -->
				<view class="account_nav">
					<view :class="['nav', putaway == 1 ? 'cur' : '']" @click="putaway=1;online=-1;">
						<view class="txt">随喜项目(上架)</view>
						<view class="num">{{putaway1amount.toFixed(2)}}</view>
					</view>
					<view :class="['nav', putaway == 0 ? 'cur' : '']" @click="putaway=0;online=-1">
						<view class="txt">随喜项目(下架)</view>
						<view class="num">{{putaway0amount.toFixed(2)}}</view></view>
					<!-- <view style="height:55px;position: relative;" :class="['nav', online == 0 ? 'cur' : '']" @click="putaway=-1;online=0;">线下捐赠<view style="width:100%;position: absolute;top:25px;">{{data.payed_amount_}}</view></view> -->
				</view>
				<view class="ac-group" v-if="putaway != -1">
					<view class="ac-row" v-for="v in online1Lists" v-if="v.putaway == putaway">
						<view class="label">{{v.name}}<span class="fs-14 fc-blue" v-if="v.putaway == 0">(已下架)</span></view>
						<view class="value Arial">{{v.order_num}}</view>
					</view>
				</view>
				<view class="ac-group" v-else>
					<view class="ac-row" v-for="v in online0Lists" >
						<view class="label">{{v.name}}<span class="fs-14 fc-blue" v-if="v.putaway == 0">(已下架)</span></view>
						<view class="value Arial">{{v.order_num}}</view>
					</view>
				</view>
			</view>
			<!-- <view class="ac-nav">
				<view class="nav w-b40" @click="goto('/pages/staff/withdraw/index',1)">一键提现</view>
				<view class="nav w-b40" @click="goto('/pages/staff/withdraw/lists',1)">提现明细</view>
				<view class="nav w-b20 onav" @click="logot()">退出</view>
			</view> -->
		</view>
		<view v-if="checkAuth == 1">
		   <view id="authBody">
				<view class="auth-img flex-center">
					<image src="/static/image/noauth.png"></image>
				</view>
				<view class="fs16 font_bold flex-center">您没有权限，请联系公司管理员</view>
			</view>
		</view>
	</view>
</template>
<script>
	import "./index.css";
	import searchType2 from '@/components/searchType'
	import '../../../provider.js';
	export default {
		components:{searchType2},
		data() {
			return {
				formAction: '/staff/boss-count',
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
