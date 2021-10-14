<template>
	<view class="bg-f online-app">
		<page :parentData="data" :formAction="formAction"></page>
		<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
		<weui-input v-model="ruleform.phone" label="电话" type="number" name="phone" datatype="require|phone"></weui-input>
		<weui-input myclass="affair" v-model="ruleform.affairType" label="预约事务" name="affairType" datatype="require" changeField="label" type="select" dataKey="affairTypeArr"></weui-input>
		<weui-input v-model="ruleform.num" label="预约人数" name="num" datatype="require" changeField="label" type="select" dataKey="numArr"></weui-input>
		<weui-input v-model="ruleform.date" label="日期" type="date" name="date" datatype="require"></weui-input>
		<weui-input v-model="ruleform.time" label="时间"  name="time" changeField="value" type="select" dataKey="timeArr" datatype="require"></weui-input>
		<weui-input v-model="ruleform.remark" label="备注" type="textarea" name="remark"></weui-input>
		
		<view class="p20 app-nav"><dx-button type="primary" icon="icon-time-o" size="lg" block @click="submit" btnBg="#A98853" btnBd="#A98853">提交</dx-button></view>
		<diag ref="diag">
			<view class="fs-16 lh-30 text-center fc-6 app-success">
				<view class="iconfont icon-pay-yes ptb20"></view>
				<view>预约申请已提交！</view>
				<view>预约成功将在公众号《江门市叱石观音寺》进行短信提醒！感恩！</view>
			</view>
			<view class="mt20 mlr50" @click="goto('/pages/index/index',2)"><dxButton type="primary" block btnBg="#A98853" btnBd="#A98853">确定</dxButton></view>
		</diag>
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
				formAction: '/appointment.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				vaildate:{},
				timeArr:[
					{label:'上午',value:"上午"},
					{label:'中午',value:"中午"},
					{label:'下午',value:"下午"},
				],
				numArr:[
					
				],
				ruleform:{
					affairType: '客堂法务咨询',
					date:this.dateToString(new Date()),
					
				},
				affairTypeArr: [{
					label: '客堂法务咨询',
					value: '1',
				},
				{
					label: '用斋（午餐）',
					value: '2',
				},
				{
					label: '礼佛、游览',
					value: '3'
				},],
			}
		},
		onLoad(){
			for (var i = 1; i < 101; i++) {
				this.numArr.push({
					label:i,
					value:i
				});
			}
			console.log(this.numArr);
		},
		
		methods: {
			submit(){
				this.vaildForm(this, res => {
					if(res){
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								this.$refs.diag.thisDiag = true;
								//this.goto("/pages/user/order/appointment",1);
							}
						});
					}
					
					
				})
			},
			
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
