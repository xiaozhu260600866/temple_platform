<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="info-fill bg-f">
				<weui-input v-model="ruleform.plat_name" label="寺院名称" type="txt" name="plat_name"></weui-input>
				<weui-input v-model="ruleform.name" label="联系人" type="text" name="name"></weui-input>
				<weui-input v-model="ruleform.phone" label="联系电话" type="number" name="phone"></weui-input>
			</view>
			<view class="m20">
				<dx-button type="primary" size="lg" block @click="submit()">提交</dx-button>
				<dx-button myclass="mt20" size="lg" block @click="logot()">退出</dx-button>
			</view>
		</view>
	</view>
</template>

<script>
	import dxButton from "doxinui/components/button/button"
	export default {
		components:{dxButton},
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
			submit(){
				setTimeout(()=>{
					this.vaildForm(this, res => {
						if (res) {
							this.postAjax("/staff/info",this.ruleform).then(msg=>{
								if(msg.data.status == 2){
									return this.goto('/pages/staff/index/index')
								}
							})
							
						}
					})
				},100);
				
			},
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
				
					this.ruleform = msg.user.userInfo;
					this.ruleform.plat_name = msg.userMerchant.userInfo.company_name;
					
				});
			}
		}
	}
</script>
<style>
@import "./index.css";
</style>