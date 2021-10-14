<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="coupon-appointment" v-if="step == 1">
			<view class="bg-f">
				<weui-input v-model="ruleform.name" label="姓名" type="text" name="name"></weui-input>
				<weui-input v-model="ruleform.phone" label="电话" type="text" name="phone"></weui-input>
				<weui-input v-model="ruleform.num" label="用餐人数" type="number" name="num" datatype="require"></weui-input>
				<weui-input v-model="ruleform.date" label="用餐日期" type="date" name="date" datatype="require"></weui-input>
				<weui-input v-model="ruleform.meal_time" label="用餐时段" datatype="require" name="meal_time" changeField="value" type="radio" dataKey="mealTimeArr" @callback="test" :row="false"></weui-input>
				<view class="plr15 pt10">请选择预约餐券</view>
				<weui-input v-model="ruleform.coupom_no" name="coupom_no" changeField="value"  datatype="require" type="checkbox" dataKey="coupomNoArr" @callback="test" :row="true" Labelleft></weui-input>
				<!-- <view class="item_tab">
					<view class="Btitle pb5">
						<view class="name lh-30">选择斋堂（请根据领取餐券选择斋堂）</view>
					</view>
					<view class="tabG">
						<view :class="['item',ruleform.amount == v  ? 'select' :'' ]" v-for="v in amountArr" v-if="v">
							<view @click="ruleform.amount = v">{{ v }}</view>
						</view>
					</view>
				</view> -->
				<view class="a-remark">
					<weui-input v-model="ruleform.remark" placeholder="请输入留言信息" type="textarea" name="remark"></weui-input>
				</view>
			</view>
			<view class="m20">
				<dx-button type="danger" size="lg" block @click="submit">提交</dx-button>
			</view>
		</view>
		<view v-if="step ==2">
			<dx-results txt="预约成功" @click="goto('/pages/index/index',2)"></dx-results>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import "../buy/index.css";
	import dxButton from "doxinui/components/button/button"
	import dxResults from "doxinui/components/results/results"
	export default {
		components:{dxButton,dxResults},
		data() {
			return {
				formAction: '/user/dinnerLists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate:{},
				step:1,
				amount_str:'清凉斋100,大斋堂10',
				mealTimeArr:[
					{label: '午餐',value: '午餐'},
					{label: '晚餐',value: '晚餐'}
				],
				coupomNoArr:[
					
				]
			}
		},
		onShareAppMessage() {
			return this.shareSource(this, '观音寺');
		},
		onLoad(options) {
			this.ajax();
		},
		onShow(){
			this.onShow(this);
		},
		methods: {
			submit(){
				this.vaildForm(this,res=>{
					if(res){
						this.postAjax("/user/dinnerOrder",this.ruleform).then(msg=>{
							if(msg.data.status == 2){
								this.step = 2;
								
							}
						});
					}
				});
			},	
			ajax() {
				this.getAjax(this).then(msg => {
					if(msg.res.length){
						this.coupomNoArr = [];
						msg.res.forEach((v,index)=>{
							this.coupomNoArr.push(
								{label:'餐券'+(index+1)+": " + v.order_no+(index+1),value:v.id}
							)
							this.ruleform.name = v.getOrder.bless_name;
							this.ruleform.phone = v.getOrder.phone;
							this.ruleform.site = v.amount == 10 ? '大斋堂' :'清凉斋'
							console.log(this.ruleform)
						})
					}
				});
			}
		}
	}
</script>
