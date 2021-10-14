<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="info-lists block-sec">
				<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.phone" label="电话" type="number" name="phone" datatype="require|phone"></weui-input>
			</view>
			<view class="m20" @click="submit"><dx-button type="success" size="lg" block btnBd="#A98853" btnBg="#A98853">提交</dx-button></view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import dxButton from "doxinui/components/button/button"　
	export default {
		components:{
			dxButton
		},
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate:{}
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
			submit(){
				this.vaildForm(this, res => {
					if(res){
						this.postAjax("/user/info2",this.ruleform).then(msg=>{
							if(msg.data.status == 2){
								this.back();
							}
						});
					}
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.ruleform.name = msg.user.userInfo.name;
					this.ruleform.phone = msg.user.userInfo.phone;
				});
			}
		}
	}
</script>
